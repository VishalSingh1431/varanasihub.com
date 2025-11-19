import Business from '../models/Business.js';
import User from '../models/User.js';
import pool from '../config/database.js';

/**
 * Get all pending website approvals
 */
export const getPendingApprovals = async (req, res) => {
  try {
    // Fetch user from database to get current role (more reliable than JWT)
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can access this' });
    }

    const query = "SELECT * FROM businesses WHERE status = 'pending' ORDER BY created_at DESC";
    const result = await pool.query(query);
    const businesses = result.rows.map(row => Business.mapRowToBusiness(row));
    res.json({ businesses });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ error: 'Failed to fetch pending approvals' });
  }
};

/**
 * Get all pending edit approvals
 */
export const getPendingEditApprovals = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can access this' });
    }

    const query = `
      SELECT * FROM businesses 
      WHERE edit_approval_status = 'pending' 
      ORDER BY updated_at DESC
    `;
    const result = await pool.query(query);
    const businesses = result.rows.map(row => Business.mapRowToBusiness(row));
    res.json({ businesses });
  } catch (error) {
    console.error('Error fetching pending edit approvals:', error);
    res.status(500).json({ error: 'Failed to fetch pending edit approvals' });
  }
};

/**
 * Approve website creation
 */
export const approveWebsite = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can approve websites' });
    }

    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.status !== 'pending') {
      return res.status(400).json({ error: 'Business is not pending approval' });
    }

    // Update business status to approved
    await pool.query(`
      UPDATE businesses SET status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = $1
    `, [id]);
    const updatedBusiness = await Business.findById(id);

    // Auto-promote user to content_admin
    if (business.userId) {
      await User.update(business.userId, { role: 'content_admin' });
      console.log(`✓ Promoted user ${business.userId} to content_admin`);
    }

    res.json({
      message: 'Website approved successfully. User has been promoted to content admin.',
      business: updatedBusiness,
    });
  } catch (error) {
    console.error('Error approving website:', error);
    res.status(500).json({ error: 'Failed to approve website' });
  }
};

/**
 * Reject website creation
 */
export const rejectWebsite = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can reject websites' });
    }

    const { id } = req.params;
    const { reason } = req.body;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.status !== 'pending') {
      return res.status(400).json({ error: 'Business is not pending approval' });
    }

    // Update business status to rejected
    await pool.query(`
      UPDATE businesses SET status = 'rejected', updated_at = CURRENT_TIMESTAMP WHERE id = $1
    `, [id]);
    const updatedBusiness = await Business.findById(id);

    res.json({
      message: 'Website rejected',
      business: updatedBusiness,
      reason: reason || 'No reason provided',
    });
  } catch (error) {
    console.error('Error rejecting website:', error);
    res.status(500).json({ error: 'Failed to reject website' });
  }
};

/**
 * Approve website edit
 */
export const approveEdit = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can approve edits' });
    }

    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.editApprovalStatus !== 'pending') {
      return res.status(400).json({ error: 'Edit is not pending approval' });
    }

    // Update edit approval status
    const updatedBusiness = await Business.update(id, {
      editApprovalStatus: 'approved',
    });

    res.json({
      message: 'Edit approved successfully',
      business: updatedBusiness,
    });
  } catch (error) {
    console.error('Error approving edit:', error);
    res.status(500).json({ error: 'Failed to approve edit' });
  }
};

/**
 * Reject website edit
 */
export const rejectEdit = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can reject edits' });
    }

    const { id } = req.params;
    const { reason } = req.body;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.editApprovalStatus !== 'pending') {
      return res.status(400).json({ error: 'Edit is not pending approval' });
    }

    // Update edit approval status to rejected
    const updatedBusiness = await Business.update(id, {
      editApprovalStatus: 'rejected',
    });

    res.json({
      message: 'Edit rejected',
      business: updatedBusiness,
      reason: reason || 'No reason provided',
    });
  } catch (error) {
    console.error('Error rejecting edit:', error);
    res.status(500).json({ error: 'Failed to reject edit' });
  }
};

/**
 * Get all users (for admin panel)
 */
export const getAllUsers = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can access this' });
    }

    const query = 'SELECT * FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    const users = result.rows.map(row => User.mapRowToUser(row));

    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Update user role (promote to content_admin)
 */
export const updateUserRole = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can update user roles' });
    }

    const { id } = req.params;
    const { role } = req.body;

    if (!['normal', 'content_admin', 'main_admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const updatedUser = await User.update(id, { role });

    res.json({
      message: 'User role updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

/**
 * Get admin dashboard stats
 */
export const getAdminStats = async (req, res) => {
  try {
    // Fetch user from database to get current role
    const user = await User.findById(req.user?.userId);
    if (!user || user.role !== 'main_admin') {
      return res.status(403).json({ error: 'Only main admin can access this' });
    }

    const [
      totalUsers,
      totalBusinesses,
      pendingApprovals,
      pendingEdits,
      approvedBusinesses,
      rejectedBusinesses,
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query('SELECT COUNT(*) FROM businesses'),
      pool.query("SELECT COUNT(*) FROM businesses WHERE status = 'pending'"),
      pool.query("SELECT COUNT(*) FROM businesses WHERE edit_approval_status = 'pending'"),
      pool.query("SELECT COUNT(*) FROM businesses WHERE status = 'approved'"),
      pool.query("SELECT COUNT(*) FROM businesses WHERE status = 'rejected'"),
    ]);

    res.json({
      stats: {
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalBusinesses: parseInt(totalBusinesses.rows[0].count),
        pendingApprovals: parseInt(pendingApprovals.rows[0].count),
        pendingEdits: parseInt(pendingEdits.rows[0].count),
        approvedBusinesses: parseInt(approvedBusinesses.rows[0].count),
        rejectedBusinesses: parseInt(rejectedBusinesses.rows[0].count),
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};

