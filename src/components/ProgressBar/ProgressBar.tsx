'use client'; // For Next.js (remove if using CRA)

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="relative h-[25px] w-full overflow-hidden rounded-md bg-gray-300">
      {/* Filled Area */}
      <div
        className={`${styles.filled} relative h-full`}
        style={{ width: `${percentage}%` }}
      >
        {/* Shining Effect */}
        <motion.div
          className={styles.shine}
          animate={{
            left: ['-50%', '120%'], // Moves across the filled area
          }}
          transition={{
            duration: 1, // Speed of shine
            repeat: Infinity, // Infinite animation
            ease: 'linear',
          }}
        />

        {/* Water Effect */}
        <div className={styles.water}></div>
      </div>

      {/* Percentage Text */}
      <span className="absolute top-1 w-[50%] text-center text-[10px] font-bold text-[white] md:w-full">
        {percentage}%
      </span>
    </div>
  );
};

export default ProgressBar;
