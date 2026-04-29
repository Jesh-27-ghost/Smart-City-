import { GlassPanel } from '../ui/GlassPanel'
import { Truck, MapPin, Navigation, Clock } from 'lucide-react'

export function LogisticsPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-blue uppercase">FLEET MANAGEMENT</h3>
              <p className="text-[10px] text-slate-400 font-mono">Public transport & waste logistics</p>
            </div>
            <Truck size={16} className="text-neon-blue" />
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Bhopal City Link Buses', total: 124, active: 118, color: 'bg-neon-cyan' },
              { label: 'Waste Collection Fleet', total: 45, active: 42, color: 'bg-neon-blue' },
              { label: 'Emergency Vehicles', total: 30, active: 30, color: 'bg-neon-red' },
            ].map((fleet, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400">{fleet.label}</span>
                  <span className="text-white font-bold">{fleet.active} / {fleet.total}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className={`${fleet.color} h-full`} style={{ width: `${(fleet.active / fleet.total) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4">ACTIVE ROUTES</h3>
          <div className="space-y-3">
            {[
              { route: 'SR-01: Bairagarh to ISBT', status: 'On Schedule', delay: '0m', icon: Navigation },
              { route: 'SR-04: Misrod to Airport', status: 'Minor Delay', delay: '5m', icon: Clock },
              { route: 'W-Zone-4: Waste Route', status: 'In Progress', delay: '--', icon: MapPin },
            ].map((route, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded border border-slate-800">
                <div className="p-2 bg-slate-800 rounded">
                  <route.icon size={14} className="text-neon-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">{route.route}</p>
                  <p className={`text-[10px] font-mono ${route.delay === '0m' ? 'text-neon-green' : 'text-neon-yellow'}`}>{route.status}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{route.delay}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 mt-auto bg-blue-950/20">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Avg Fuel Efficiency:</span>
              <span className="text-xs font-bold text-white">4.2 km/L</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Daily Coverage:</span>
              <span className="text-xs font-bold text-white">12,400 km</span>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
