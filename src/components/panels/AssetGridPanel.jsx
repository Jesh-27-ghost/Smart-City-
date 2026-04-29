import { GlassPanel } from '../ui/GlassPanel'
import { Grid, Lightbulb, Camera, Wifi, Settings } from 'lucide-react'

export function AssetGridPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-cyan uppercase">ASSET DISTRIBUTION</h3>
              <p className="text-[10px] text-slate-400 font-mono">Infrastructure node mapping</p>
            </div>
            <Grid size={16} className="text-neon-cyan" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Smart Lights', count: '14,204', status: '98%', icon: Lightbulb, color: 'text-neon-yellow' },
              { label: 'CCTV Nodes', count: '1,240', status: 'Online', icon: Camera, color: 'text-neon-cyan' },
              { label: 'WiFi Hotspots', count: '450', status: 'Active', icon: Wifi, color: 'text-neon-blue' },
              { label: 'IoT Sensors', count: '2,840', status: 'Healthy', icon: Settings, color: 'text-neon-green' },
            ].map((asset, i) => (
              <div key={i} className="p-4 bg-slate-900/60 rounded border border-slate-800 hover:border-slate-700 transition-all group">
                <asset.icon size={20} className={`${asset.color} mb-3 group-hover:scale-110 transition-transform`} />
                <p className="text-[10px] font-mono text-slate-500 uppercase">{asset.label}</p>
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-lg font-bold text-white font-display">{asset.count}</span>
                  <span className={`text-[8px] font-mono ${asset.color}`}>{asset.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4">MAINTENANCE SCHEDULER</h3>
          <div className="space-y-3">
            {[
              { asset: 'Sensor Node B-42', task: 'Calibration', time: 'In 2 hrs', urgency: 'Low' },
              { asset: 'Camera C-104', task: 'Hardware Reset', time: 'Immediate', urgency: 'High' },
              { asset: 'Gate Grid G-02', task: 'Firmware Update', time: 'Tomorrow', urgency: 'Medium' },
            ].map((job, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded border border-slate-800">
                <div className={`w-1 h-8 rounded-full ${
                  job.urgency === 'High' ? 'bg-neon-red' : job.urgency === 'Medium' ? 'bg-neon-yellow' : 'bg-neon-cyan'
                }`}></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">{job.asset}</p>
                  <p className="text-[10px] font-mono text-slate-500">{job.task}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{job.time}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 mt-auto bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Total Asset Value:</span>
            <span className="text-xs font-bold text-white">₹142.8 Cr</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Operational Uptime:</span>
            <span className="text-xs font-bold text-neon-green">99.98%</span>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
