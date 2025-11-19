import express from 'express';
import multer from 'multer';
import {
  createBusiness,
  getBusinessBySlug,
  getBusinessBySubdomain,
  getAllBusinesses,
  getUserBusinesses,
  getBusinessById,
  updateBusiness,
  checkSubdomainAvailability,
} from '../controllers/businessController.js';
import { uploadBusinessMedia, processCloudinaryUploads } from '../middleware/cloudinaryUpload.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create business website (with file uploads)
router.post('/create', (req, res, next) => {
  uploadBusinessMedia(req, res, (err) => {
    if (err) {
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      // Handle other upload errors
      return res.status(400).json({ error: err.message || 'File upload error' });
    }
    next();
  });
}, processCloudinaryUploads, createBusiness);

// Get all businesses (must come before /:slug to avoid conflicts)
router.get('/', getAllBusinesses);

// Check subdomain availability (must come before /:slug to avoid conflicts)
router.get('/check-subdomain', checkSubdomainAvailability);

// Get user's businesses (requires authentication)
router.get('/my-businesses', verifyToken, getUserBusinesses);

// Get business by ID for editing (requires authentication)
router.get('/edit/:id', verifyToken, getBusinessById);

// Update business (requires authentication)
router.put('/edit/:id', verifyToken, (req, res, next) => {
  uploadBusinessMedia(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message || 'File upload error' });
    }
    next();
  });
}, processCloudinaryUploads, updateBusiness);

// Get business by slug (for subdirectory: /slug) - must be last
router.get('/:slug', getBusinessBySlug);

export default router;

