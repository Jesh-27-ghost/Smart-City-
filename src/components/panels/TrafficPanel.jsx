import { GlassPanel } from '../ui/GlassPanel'
import { Car, Clock, AlertCircle } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const trafficData = [
  { time: '08:00', flow: 400 },
  { time: '10:00', flow: 800 },
  { time: '12:00', flow: 600 },
  { time: '14:00', flow: 550 },
  { time: '16:00', flow: 900 },
  { time: '18:00', flow: 1200 },
  { time: '20:00', flow: 700 },
]

export function TrafficPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-cyan uppercase">TRAFFIC ANALYTICS</h3>
              <p className="text-[10px] text-slate-400 font-mono">Real-time throughput - Vehicles/hr</p>
            </div>
            <Car size={16} className="text-neon-cyan" />
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1727', border: '1px solid #1e293b', fontSize: '10px' }}
                  itemStyle={{ color: '#00f5ff' }}
                />
                <Line type="monotone" dataKey="flow" stroke="#00f5ff" strokeWidth={2} dot={{ r: 4, fill: '#00f5ff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4">CONGESTION ALERTS</h3>
          <div className="space-y-3">
            {[
              { loc: 'MP Nagar Zone II', delay: '12 min', status: 'High' },
              { loc: 'New Market Crossing', delay: '4 min', status: 'Low' },
              { loc: 'Chetak Bridge', delay: '25 min', status: 'Critical' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-900/40 rounded border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${alert.status === 'Critical' ? 'bg-neon-red animate-pulse' : 'bg-neon-yellow'}`}></div>
                  <span className="text-xs font-medium text-slate-300">{alert.loc}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-neon-cyan">{alert.delay}</span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">{alert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 mt-auto">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-slate-500" />
            <p className="text-[10px] font-mono text-slate-400">NEXT PEAK CYCLE: 17:30 - 19:00</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
