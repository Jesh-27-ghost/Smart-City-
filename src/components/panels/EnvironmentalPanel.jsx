import { GlassPanel } from '../ui/GlassPanel'
import { Leaf, Wind, Thermometer, Droplets, CloudRain } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const aqiData = [
  { time: '08:00', val: 35 },
  { time: '10:00', val: 42 },
  { time: '12:00', val: 58 },
  { time: '14:00', val: 65 },
  { time: '16:00', val: 52 },
  { time: '18:00', val: 48 },
  { time: '20:00', val: 40 },
]

export function EnvironmentalPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-green uppercase">AIR QUALITY INDEX</h3>
              <p className="text-[10px] text-slate-400 font-mono">Real-time PM2.5 monitoring</p>
            </div>
            <Wind size={16} className="text-neon-green" />
          </div>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="text-5xl font-bold font-display text-white drop-shadow-[0_0_10px_rgba(57,255,20,0.4)]">42</div>
            <div className="flex-1">
              <span className="text-[10px] font-mono text-neon-green bg-neon-green/10 px-2 py-0.5 rounded border border-neon-green/30 uppercase">GOOD</span>
              <p className="text-[10px] text-slate-500 mt-2 font-mono leading-tight">Current AQI is within healthy limits for all city zones.</p>
            </div>
          </div>

          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aqiData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Line type="monotone" dataKey="val" stroke="#39ff14" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded">
                <Thermometer size={16} className="text-neon-red" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase">Temp</p>
                <p className="text-sm font-bold text-white">32°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded">
                <Droplets size={16} className="text-neon-blue" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase">Humidity</p>
                <p className="text-sm font-bold text-white">45%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded">
                <Leaf size={16} className="text-neon-green" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase">CO2 Level</p>
                <p className="text-sm font-bold text-white">412 ppm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded">
                <CloudRain size={16} className="text-slate-500" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase">Precip</p>
                <p className="text-sm font-bold text-white">0.0 mm</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 mt-auto">
          <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4">CITY GREEN BELT STATUS</h3>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-neon-green h-full w-[68%] shadow-[0_0_10px_#39ff14]"></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-500">
            <span>TARGET: 75%</span>
            <span className="text-neon-green">CURRENT: 68%</span>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
