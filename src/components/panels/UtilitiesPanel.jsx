import { GlassPanel } from '../ui/GlassPanel'
import { Zap, Droplets, Trash2, Battery } from 'lucide-react'

export function UtilitiesPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-yellow uppercase">POWER GRID</h3>
              <p className="text-[10px] text-slate-400 font-mono">Real-time load distribution</p>
            </div>
            <Zap size={16} className="text-neon-yellow" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-slate-400">Main Grid Load</span>
                <span className="text-neon-yellow">78%</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-neon-yellow h-full w-[78%]"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-slate-400">Solar Supplement</span>
                <span className="text-neon-green">14%</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-neon-green h-full w-[14%]"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="flex-1 bg-slate-900/40 rounded p-3 border border-slate-800 flex items-center gap-3">
              <Battery size={16} className="text-neon-green" />
              <div>
                <p className="text-[8px] font-mono text-slate-500 uppercase">Reserves</p>
                <p className="text-xs font-bold text-white">92.4%</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-blue uppercase">WATER MGMT</h3>
              <p className="text-[10px] text-slate-400 font-mono">Bada Talab Supply Status</p>
            </div>
            <Droplets size={16} className="text-neon-blue" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-20 bg-neon-blue/10 rounded relative overflow-hidden border border-neon-blue/20">
              <div className="absolute bottom-0 left-0 w-full bg-neon-blue/40 animate-pulse h-[65%]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white font-mono">65%</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-[10px] font-mono text-slate-400 uppercase">Pressure: <span className="text-neon-cyan">4.2 bar</span></p>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Purity: <span className="text-neon-green">98%</span></p>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Daily Out: <span className="text-neon-cyan">142 ML</span></p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-cyan uppercase">WASTE COLLECTION</h3>
              <p className="text-[10px] text-slate-400 font-mono">Route efficiency tracking</p>
            </div>
            <Trash2 size={16} className="text-slate-500" />
          </div>
          <div className="mt-4 p-3 bg-slate-900/40 rounded border border-slate-800">
            <div className="flex justify-between text-[10px] font-mono mb-2">
              <span className="text-slate-400">Active Trucks</span>
              <span className="text-neon-cyan">42 / 45</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-neon-cyan h-full w-[93%]"></div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
