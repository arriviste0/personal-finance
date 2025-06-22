'use client';

import { motion } from 'framer-motion';
import { DollarSign, PiggyBank, Landmark, TrendingUp, ShieldCheck, CreditCard } from 'lucide-react';
import React from 'react';

const icons = [
  { icon: DollarSign, className: 'text-green-500/30', size: 60, initial: { top: '10%', left: '15%' } },
  { icon: PiggyBank, className: 'text-pink-500/30', size: 80, initial: { top: '20%', left: '80%' } },
  { icon: Landmark, className: 'text-blue-500/30', size: 70, initial: { top: '75%', left: '10%' } },
  { icon: TrendingUp, className: 'text-yellow-500/30', size: 90, initial: { top: '60%', left: '85%' } },
  { icon: ShieldCheck, className: 'text-purple-500/30', size: 50, initial: { top: '85%', left: '50%' } },
  { icon: CreditCard, className: 'text-indigo-500/30', size: 75, initial: { top: '5%', left: '50%' } },
];

const variants = {
  animate: (i: number) => ({
    y: [0, -10, 10, -5, 5, 0],
    x: [0, 5, -5, 10, -10, 0],
    rotate: [0, i % 2 === 0 ? 5 : -5, 0],
    transition: {
      duration: 15 + (i * 5),
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 2,
    },
  }),
};

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {icons.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className={`absolute`}
            style={{ ...item.initial }}
            custom={i}
            animate="animate"
            variants={variants}
          >
            <Icon className={item.className} size={item.size} strokeWidth={1} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AuthBackground;
