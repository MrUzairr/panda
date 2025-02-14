import React from 'react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-extrabold text-primary"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.div>
        <motion.p
          className="mb-4 text-2xl font-medium text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Oops! The page you're looking for cannot be found.
        </motion.p>
        <motion.a
          href="/"
          className="text-lg text-primary hover:text-primary"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Go back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
