import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const VerifiedBadge = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-bold shadow-lg ${className}`}
      title="Verified Business"
    >
      <BadgeCheck className={sizes[size]} />
      <span>Verified</span>
    </motion.div>
  );
};

