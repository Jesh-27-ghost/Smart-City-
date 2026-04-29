import { GlassPanel } from '../ui/GlassPanel'
import { Shield, ShieldCheck, AlertTriangle, Eye } from 'lucide-react'

export function SafetyPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-green uppercase">SAFETY INDEX</h3>
              <p className="text-[10px] text-slate-400 font-mono">City-wide surveillance metric</p>
            </div>
            <ShieldCheck size={16} className="text-neon-green" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-neon-green shadow-[0_0_10px_#39ff14]"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="88.4, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">88.4</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500 uppercase">Emergency Resp.</span>
                <span className="text-neon-cyan">2.4m</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500 uppercase">Patrol Coverage</span>
                <span className="text-neon-cyan">94%</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500 uppercase">Active Cameras</span>
                <span className="text-neon-cyan">1,240</span>
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4">INCIDENT LOGS</h3>
          <div className="space-y-3">
            {[
              { type: 'Structural', time: '2 mins ago', icon: AlertTriangle, color: 'text-neon-yellow' },
              { type: 'Surveillance', time: '14 mins ago', icon: Eye, color: 'text-neon-cyan' },
              { type: 'SOS Trigger', time: 'Idle', icon: Shield, color: 'text-slate-500' },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded border border-slate-800">
                <log.icon size={16} className={log.color} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">{log.type}</p>
                  <p className="text-[10px] font-mono text-slate-500">{log.time}</p>
                </div>
                <button className="text-[8px] font-bold text-neon-cyan border border-neon-cyan/30 px-2 py-1 rounded hover:bg-neon-cyan/10 transition-colors uppercase">View</button>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 mt-auto bg-neon-red/5 border-neon-red/20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neon-red animate-ping"></div>
            <p className="text-[10px] font-mono text-neon-red font-bold tracking-widest">RAPID RESPONSE STANDBY</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
