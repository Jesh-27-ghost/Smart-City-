import { motion } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { Trash2, TrendingUp, Sparkles, Activity, Gauge, Zap } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts'

const wasteData = [
  { time: '7:01', amount: 4 },
  { time: '7:02', amount: 6 },
  { time: '7:03', amount: 5 },
  { time: '7:04', amount: 8 },
  { time: '7:05', amount: 7 },
]

const parkingData = [
  { time: '00:00', occ: 20 },
  { time: '04:00', occ: 25 },
  { time: '08:00', occ: 60 },
  { time: '12:00', occ: 90 },
  { time: '16:00', occ: 85 },
  { time: '20:00', occ: 95 },
  { time: '24:00', occ: 40 },
]

const containerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

export function OverviewPanel() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full flex justify-end pointer-events-none p-4"
    >
      <div className="w-[400px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-24">
        
        {/* ATMOSPHERE BRIEFING - PREMIUM */}
        <motion.div variants={itemVariants}>
          <GlassPanel className="p-6 border-l-4 border-l-neon-cyan relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles size={120} className="text-neon-cyan" />
            </div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neon-cyan/20 rounded-xl flex items-center justify-center border border-neon-cyan/30">
                  <Activity size={18} className="text-neon-cyan animate-pulse" />
                </div>
                <h3 className="font-display font-black tracking-[0.2em] text-xs text-white uppercase">ATMOS INTEL</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-neon-red/20 border border-neon-red/40 text-neon-red text-[10px] font-black font-mono animate-pulse">
                HEATWAVE ALERT
              </div>
            </div>
            <p className="text-[13px] text-slate-200 font-body mb-6 leading-relaxed italic border-l-2 border-neon-cyan/40 pl-4 bg-slate-900/40 p-4 rounded-r-xl">
              "Neural Engine: Extreme thermal peak. Sector G-04 power consumption surge +22% predicted."
            </p>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 shadow-inner">
                <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1">SAFE WINDOW</p>
                <p className="text-sm font-bold text-neon-cyan uppercase tracking-widest">19:00 - 22:00</p>
              </div>
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 shadow-inner">
                <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1">UV PEAK</p>
                <p className="text-sm font-bold text-neon-yellow uppercase tracking-widest">11:45 IST</p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* WASTE ANALYTICS */}
        <motion.div variants={itemVariants}>
          <GlassPanel className="p-8 flex-shrink-0 group">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neon-blue/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-neon-blue/30 transition-all">
                  <Trash2 size={20} className="text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-display font-black tracking-[0.2em] text-xs text-white uppercase">WASTE METRICS</h3>
                  <p className="text-[10px] text-slate-500 font-mono uppercase font-black">Zone Distribution [TONS]</p>
                </div>
              </div>
            </div>
            
            <div className="h-32 w-full bg-slate-950/40 rounded-2xl border border-white/5 p-4 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteData}>
                  <XAxis dataKey="time" hide />
                  <Bar dataKey="amount" fill="rgba(0, 245, 255, 0.4)" radius={[4, 4, 0, 0]} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0a0f18', border: '1px solid #1e293b'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </motion.div>

        {/* INFRASTRUCTURE LOAD */}
        <motion.div variants={itemVariants} className="flex-1 min-h-0">
          <GlassPanel className="p-8 h-full flex flex-col group">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neon-green/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-neon-green/30 transition-all">
                  <Gauge size={20} className="text-neon-green" />
                </div>
                <div>
                  <h3 className="font-display font-black tracking-[0.2em] text-xs text-white uppercase">GRID LOAD</h3>
                  <p className="text-[10px] text-slate-500 font-mono uppercase font-black">Capacity vs Consumption</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-neon-green/10 text-neon-green px-3 py-1 rounded-full border border-neon-green/30 text-[10px] font-black font-mono">
                <TrendingUp size={12} />
                <span>+12.4%</span>
              </div>
            </div>
            
            <div className="flex-1 min-h-[160px] w-full bg-slate-950/40 rounded-3xl border border-white/5 p-6 shadow-inner relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent pointer-events-none"></div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={parkingData}>
                  <Line type="monotone" dataKey="occ" stroke="#39ff14" strokeWidth={4} dot={{r: 4, fill: '#39ff14'}} activeDot={{r: 8}} />
                  <Tooltip contentStyle={{backgroundColor: '#0a0f18', border: '1px solid #1e293b'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 shadow-inner group/stat">
                <p className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase font-black mb-1 group-hover/stat:text-neon-cyan transition-colors">ACTIVE NODES</p>
                <p className="text-2xl font-display font-black text-white tracking-tighter">4.2k <span className="text-[10px] text-neon-green">LIVE</span></p>
              </div>
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 shadow-inner group/stat">
                <p className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase font-black mb-1 group-hover/stat:text-neon-yellow transition-colors">THROUGHPUT</p>
                <p className="text-2xl font-display font-black text-white tracking-tighter">84 <span className="text-[10px] text-slate-500">GB/S</span></p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* SYSTEM CONNECTIVITY */}
        <motion.div variants={itemVariants}>
          <GlassPanel className="p-6 flex items-center justify-between border-t-2 border-t-neon-green/30">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#39ff14]"></div>
              <h3 className="font-display font-black tracking-[0.3em] text-[11px] text-white uppercase">NEURAL LINK ESTABLISHED</h3>
            </div>
            <Zap size={14} className="text-neon-green animate-bounce" />
          </GlassPanel>
        </motion.div>

      </div>
    </motion.div>
  )
}
