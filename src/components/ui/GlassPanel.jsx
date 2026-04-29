import { motion } from 'framer-motion'

export function GlassPanel({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`glass-panel rounded-[2rem] overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      whileHover={hover ? { 
        y: -10, 
        scale: 1.01,
        boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 255, 0.1)',
        borderColor: 'rgba(0, 245, 255, 0.3)'
      } : {}}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] // Custom quint ease-out
      }}
    >
      {/* Dynamic scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-[200%] animate-scanline pointer-events-none"></div>
      
      {/* Subtle corner highlight */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
