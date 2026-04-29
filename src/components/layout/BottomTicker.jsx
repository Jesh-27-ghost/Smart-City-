import { motion } from 'framer-motion'

const newsItems = [
  "Bada Talab Sector Optimized",
  "AQI: 42 (Stable)",
  "Grid Load: 68%",
  "Emergency Services: Standby",
  "Traffic Flow: Nominal"
]

export function BottomTicker() {
  return (
    <footer className="fixed bottom-0 w-full z-50 h-8 flex items-center overflow-hidden whitespace-nowrap px-4 bg-slate-950/90 backdrop-blur-md border-t border-cyan-500/40 shadow-[0_-5px_20px_rgba(0,242,255,0.15)]">
      <div className="flex items-center w-full">
        <div className="font-display text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-400 mr-8 shrink-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          LIVE FEED: 
        </div>
        
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-8 items-center h-full absolute whitespace-nowrap font-display text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-400"
          >
            {[...newsItems, ...newsItems].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {item} {i !== newsItems.length * 2 - 1 && <span className="text-cyan-700 ml-8">•</span>}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="flex-1 flex justify-end gap-6 z-10 bg-slate-950/90 pl-4">
          <a className="font-display text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-600 hover:text-cyan-300 transition-colors" href="#">Protocol-X</a>
          <a className="font-display text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-600 hover:text-cyan-300 transition-colors" href="#">System-Logs</a>
        </div>
      </div>
    </footer>
  )
}
