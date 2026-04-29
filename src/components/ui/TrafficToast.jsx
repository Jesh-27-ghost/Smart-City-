import { AnimatePresence, motion } from 'framer-motion'
import { useTrafficStore } from '../../store/trafficStore'

export function TrafficToast() {
  const toasts = useTrafficStore(state => state.toasts)

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="px-6 py-3 bg-slate-950/80 backdrop-blur-xl border border-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.3)] rounded-full text-white text-xs font-mono font-black tracking-widest flex items-center gap-3"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
