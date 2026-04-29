import { GlassPanel } from '../ui/GlassPanel'
import { Brain, Zap, AlertTriangle, TrendingUp } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts'

const forecastData = [
  { time: '18:00', risk: 30 },
  { time: '20:00', risk: 45 },
  { time: '22:00', risk: 60 },
  { time: '00:00', risk: 25 },
  { time: '02:00', risk: 15 },
  { time: '04:00', risk: 20 },
  { time: '06:00', risk: 50 },
]

export function PredictiveAIPanel() {
  return (
    <div className="w-full h-full flex justify-end pointer-events-none">
      <div className="w-[420px] h-full flex flex-col gap-4 pointer-events-auto overflow-y-auto custom-scrollbar pr-2 pb-12">
        <GlassPanel className="p-5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold tracking-widest text-xs text-neon-cyan uppercase">AI RISK FORECAST</h3>
              <p className="text-[10px] text-slate-400 font-mono">System-wide anomaly prediction</p>
            </div>
            <Brain size={16} className="text-neon-cyan animate-pulse" />
          </div>
          
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1727', border: '1px solid #1e293b', fontSize: '10px' }}
                  itemStyle={{ color: '#00f5ff' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#00f5ff" fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-500">CONFIDENCE LEVEL:</span>
            <span className="text-neon-green">98.2%</span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4">PREDICTIVE INSIGHTS</h3>
          <div className="space-y-3">
            {[
              { label: 'Traffic Surge', time: 'In 45 mins', risk: 'Medium', icon: TrendingUp },
              { label: 'Grid Instability', time: 'In 2.4 hrs', risk: 'Low', icon: Zap },
              { label: 'Heat Alert', time: 'Tomorrow', risk: 'High', icon: AlertTriangle },
            ].map((insight, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="p-2 bg-slate-800 rounded">
                  <insight.icon size={14} className="text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-300">{insight.label}</p>
                  <p className="text-[10px] font-mono text-slate-500">{insight.time}</p>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                  insight.risk === 'High' ? 'text-neon-red border-neon-red/30 bg-neon-red/10' :
                  insight.risk === 'Medium' ? 'text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10' :
                  'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10'
                }`}>
                  {insight.risk}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 mt-auto border-t-2 border-t-neon-cyan bg-cyan-950/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
            <h3 className="font-display font-bold tracking-widest text-[10px] text-neon-cyan uppercase">GEMINI LIVE ANALYSIS</h3>
          </div>
          <p className="text-[10px] font-mono text-slate-300 leading-relaxed italic">
            "Current pattern suggests a 15% increase in traffic flow near MP Nagar due to the upcoming peak hour. Recommend pre-emptive signal optimization at Chetak Bridge."
          </p>
        </GlassPanel>
      </div>
    </div>
  )
}
