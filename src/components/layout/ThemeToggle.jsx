import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <div
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle cursor-pointer w-8"
      aria-checked={isDark} 
    >
      <input type="checkbox" checked={isDark} readOnly className="sr-only" />
      <motion.span
        className="indicator"
        initial={false}
        animate={{ backgroundColor: isDark ? '#ffffff' : '#1e293b' }}
        style={{width: '10px', height:'10px'}}
      />
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isDark ? (
          <FiMoon className="w-7 h-7 max-sm:w-5 max-sm-h-5 text-yellow-300" />
        ) : (
          <FiSun className="w-7 h-7 max-sm:w-5 max-sm-h-5 text-yellow-500" />
        )}
      </span>
    </div>
  );
}