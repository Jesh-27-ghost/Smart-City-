import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Settings, Sun, Shield, Activity, Wifi, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCityStore } from '../../store/cityStore'

const tabs = [
  { id: 'command-center', label: 'Overview' },
  { id: 'traffic', label: 'Traffic' },
  { id: 'safety', label: 'Safety' },
  { id: 'utilities', label: 'Utilities' },
]

export function TopBar() {
  const [time, setTime] = useState(new Date())
  const { activeSection, setSection, userRole, setUserRole } = useCityStore()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="w-full h-18 bg-slate-950 border-b border-white/5 flex items-center justify-between px-8 z-50 shrink-0 shadow-2xl relative overflow-hidden">
      
      {/* Decorative scanline on header */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent animate-scanline"></div>

      {/* Left side: Brand and Navigation */}
      <div className="flex items-center gap-12 h-full">
        <div className="flex flex-col">
          <h1 className="font-display font-black text-xl tracking-[0.1em] text-white uppercase leading-none">
            BHOPAL <span className="text-neon-cyan">NEXUS</span>
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_8px_#39ff14]"></div>
             <p className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-[0.3em]">Operational :: Digital Twin V4.0</p>
          </div>
        </div>

        <nav className="flex items-center gap-8 h-full">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`h-full relative px-2 flex flex-col justify-center transition-all duration-300 group
                ${activeSection === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              <span className="font-display font-black text-[11px] uppercase tracking-widest leading-none mb-1">{tab.label}</span>
              <span className="text-[7px] font-mono font-bold text-slate-700 uppercase tracking-widest group-hover:text-slate-500 transition-colors">Sector Access</span>
              
              {activeSection === tab.id && (
                <motion.div 
                  layoutId="activeTopTab"
                  className="absolute bottom-0 left-0 w-full h-1 bg-neon-cyan shadow-[0_-4px_15px_rgba(0,245,255,0.6)] rounded-t-full"
                ></motion.div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Right side: Intelligence Feed and User Control */}
      <div className="flex items-center gap-10">
        
        {/* Status Hub */}
        <div className="hidden xl:flex items-center gap-8 border-x border-white/5 px-8 h-10">
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-mono font-black text-slate-600 uppercase tracking-widest">Live Feed</span>
              <div className="flex items-center gap-2">
                 <span className="font-mono text-[10px] text-white font-bold tracking-widest">
                    {time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })} IST
                 </span>
                 <Wifi size={10} className="text-neon-cyan animate-pulse" />
              </div>
           </div>

           <div className="w-px h-6 bg-white/5"></div>

           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                 <span className="text-[8px] font-mono font-black text-slate-600 uppercase tracking-widest">Safety Matrix</span>
                 <span className="font-mono text-[10px] text-neon-cyan font-black tracking-widest">88.4 / 100</span>
              </div>
              <Shield size={14} className="text-neon-cyan/60" />
           </div>
        </div>

        {/* Global Weather Quick-stat */}
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex flex-col items-end">
             <span className="text-[7px] font-mono text-slate-500 font-bold uppercase">Sector Temp</span>
             <span className="font-mono text-xs font-black text-white">32°C</span>
          </div>
          <Sun size={16} className="text-neon-yellow group-hover:rotate-180 transition-transform duration-700" />
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setUserRole('user')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${userRole === 'user' ? 'bg-neon-cyan text-black shadow-[0_0_10px_rgba(0,245,255,0.5)]' : 'text-slate-500 hover:text-white'}`}
          >
            User
          </button>
          <button 
            onClick={() => setUserRole('admin')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${userRole === 'admin' ? 'bg-neon-cyan text-black shadow-[0_0_10px_rgba(0,245,255,0.5)]' : 'text-slate-500 hover:text-white'}`}
          >
            Admin
          </button>
        </div>

        {/* Action Tray */}
        <div className="flex items-center gap-5">
           <button className="relative p-2 text-slate-500 hover:text-white transition-colors">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_10px_#00f5ff] animate-pulse"></span>
           </button>
           <div className="w-px h-6 bg-white/5"></div>
           <button className="flex items-center gap-3 pl-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-neon-cyan/50 transition-colors">
                 <Settings size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <ChevronDown size={14} className="text-slate-600 group-hover:text-white" />
           </button>
        </div>
      </div>
    </header>
  )
}
