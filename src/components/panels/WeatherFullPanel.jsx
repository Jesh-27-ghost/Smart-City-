import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { WeatherBackground } from '../ui/WeatherBackground'
import { 
  Sparkles, Sun, Clock, Shirt, Wind, Thermometer, Droplets, 
  TrendingUp, AlertTriangle, X, ThermometerSun, 
  Brain, Zap, Gauge, Eye, Cloud, Map as MapIcon,
  Navigation, Info, Waves, ChevronRight, Activity,
  Sunrise, Sunset, MapPin, Target, Radar, Hexagon, Terminal,
  ShieldCheck, ZapOff, RefreshCcw, ArrowUpRight, BarChart4,
  Wind as WindIcon, MoveUpRight
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, BarChart, Bar } from 'recharts'

const forecastData = [
  { day: 'Mon', max: 32, min: 24 }, { day: 'Tue', max: 34, min: 25 }, { day: 'Wed', max: 38, min: 28 },
  { day: 'Thu', max: 37, min: 27 }, { day: 'Fri', max: 35, min: 26 }, { day: 'Sat', max: 34, min: 25 }, { day: 'Sun', max: 32, min: 24 },
]

const sparklineData = [
  { day: '00:00', temp: 30, deviation: 2.1 }, { day: '02:00', temp: 32, deviation: 2.4 }, { day: '04:00', temp: 31, deviation: 1.8 }, { day: '06:00', temp: 34, deviation: 3.2 },
  { day: '08:00', temp: 33, deviation: 2.9 }, { day: '10:00', temp: 35, deviation: 4.1 }, { day: '12:00', temp: 38, deviation: 8.2 }, { day: '14:00', temp: 37, deviation: 7.5 },
  { day: '16:00', temp: 39, deviation: 9.1 }, { day: '18:00', temp: 40, deviation: 10.4 }, { day: '20:00', temp: 38, deviation: 8.8 }, { day: '22:00', temp: 39, deviation: 9.3 }
]

const miniChartData = [
  { val: 10 }, { val: 15 }, { val: 12 }, { val: 20 }, { val: 18 }, { val: 25 }, { val: 22 }
]

const systemLogs = [
  "[SYSTEM] INITIALIZING THERMAL CORE...",
  "[SENSOR] GRID-7 ACTIVE. DELTA +8.2C",
  "[AI] OPTIMIZING POWER LOAD FOR SECTOR 4",
  "[NETWORK] SATELLITE LINK STABLE :: BH-07",
  "[WEATHER] HIGH PRESSURE FRONT DETECTED",
  "[COOLING] RADIATOR G4 AT 85% CAPACITY",
  "[NODE] DATA SYNC COMPLETED IN 24ms",
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 border border-neon-red/30 p-4 rounded-xl backdrop-blur-xl shadow-2xl min-w-[140px]">
        <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1.5">
           <Clock size={10} className="text-slate-500" />
           <p className="text-[10px] font-mono font-black text-white">{label} IST</p>
        </div>
        <div className="space-y-1.5">
           <div className="flex justify-between items-center gap-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest">TEMP</span>
              <span className="text-xs font-mono font-black text-white">{payload[0].value}°C</span>
           </div>
           <div className="flex justify-between items-center gap-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest">DELTA</span>
              <span className="text-xs font-mono font-black text-neon-red">+{payload[0].payload.deviation}°C</span>
           </div>
        </div>
      </div>
    );
  }
  return null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
}

export function WeatherFullPanel() {
  const [dismissAlert, setDismissAlert] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [logIndex, setLogIndex] = useState(0)
  const temperature = 38
  const aqi = 142

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 600)
    const logTimer = setInterval(() => {
      setLogIndex(prev => (prev + 1) % systemLogs.length)
    }, 2500)
    return () => { clearTimeout(timer); clearInterval(logTimer); }
  }, [])

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full flex flex-col gap-6 pointer-events-auto overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar pb-32 p-4"
    >
      
      {/* HEADER */}
      <motion.div variants={itemVariants} className="relative overflow-hidden p-8 rounded-[1.5rem] border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-xl min-h-[160px] flex items-center">
        <WeatherBackground condition="sunny" temperature={temperature} />
        
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-[1rem] flex items-center justify-center border border-white/10 shadow-xl backdrop-blur-md">
              <Cloud className="text-neon-cyan w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-black text-white tracking-tighter uppercase leading-none">
                ATMOSPHERE <span className="text-neon-cyan">AI</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
                <p className="text-slate-500 font-mono text-[9px] uppercase font-black tracking-[0.25em]">Node :: BH-07-ALFA</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center gap-10">
            {[
              { icon: Sunrise, label: 'Sun Rise', val: '05:42' },
              { icon: Sunset, label: 'Sun Set', val: '18:15' },
              { icon: Zap, label: 'UV-B Index', val: '8.4 MAX' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="text-[8px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-center gap-2 text-white">
                  <stat.icon size={11} className="text-neon-yellow" />
                  <span className="text-xs font-black font-mono tracking-widest">{stat.val}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
             <div className="bg-black/40 px-5 py-2.5 rounded-xl border border-white/5 backdrop-blur-md flex items-center gap-3">
                <Activity size={14} className="text-neon-green animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Link :: Nominal</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* ALERT */}
      <AnimatePresence>
        {!dismissAlert && temperature > 35 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-[1.5rem] bg-neon-red/5 border border-neon-red/20 p-5 flex items-center gap-6 shadow-xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,46,46,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-scanline pointer-events-none"></div>
            <div className="w-10 h-10 bg-neon-red/10 rounded-xl flex items-center justify-center border border-neon-red/30">
              <AlertTriangle className="w-6 h-6 text-neon-red" />
            </div>
            <div className="flex-1">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">Thermal Overload Warning</h3>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed uppercase">
                Sector G4 at <span className="text-neon-red font-bold">+8.2°C Delta</span>. Auxiliary cooling protocols engaged.
              </p>
            </div>
            <button onClick={() => setDismissAlert(true)} className="p-2 text-slate-600 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          <motion.div variants={itemVariants}>
            <GlassPanel className="p-0 border-white/5 rounded-[2rem] shadow-2xl overflow-hidden bg-slate-950/40">
              <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/30">
                    <Brain className="text-neon-cyan w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-black text-white tracking-widest uppercase">Atmosphere AI Advisor</h3>
                    <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">Neural Intelligence Link :: Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-white/10">
                   <ShieldCheck size={10} className="text-neon-green" />
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Verified</span>
                </div>
              </div>
              
              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                  {[
                    { icon: Sun, title: "Solar Peak", content: "Intense radiation surge at 11:45 IST. High-altitude particulate levels rising.", color: "text-neon-yellow" },
                    { icon: Clock, title: "Stability Window", content: "Thermal equilibrium returns at 19:00. Optimal period for sector logistics.", color: "text-neon-cyan" },
                    { icon: Shirt, title: "Civil Protection", content: "UV-B Index is EXTREME. Wear protective outer layers and maintain hydration.", color: "text-neon-green" }
                  ].map((tip, i) => (
                    <div key={i} className="group relative">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 group-hover:border-white/20 transition-all">
                          <tip.icon size={16} className={tip.color} />
                        </div>
                        <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">{tip.title}</h4>
                      </div>
                      <p className="text-[13px] text-slate-400 leading-relaxed font-medium group-hover:text-slate-200 transition-colors">{tip.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-cyan-950/20 to-transparent rounded-2xl border border-neon-cyan/20 p-8 flex items-start gap-6 relative overflow-hidden group">
                  <Sparkles className="text-neon-cyan w-6 h-6 mt-1 flex-shrink-0" />
                  <div className="relative z-10">
                     <p className="text-[14px] italic text-slate-300 leading-relaxed font-medium">
                       "Pattern Analysis Complete: High probability of localized heat-islands in Sector 4. Internal thermal sensors indicate a 12% rise in energy demand."
                     </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* ANOMALY TREND */}
          <motion.div variants={itemVariants}>
            <GlassPanel className="p-8 rounded-[2rem] h-full flex flex-col bg-slate-950/40 border-white/5 border-l-4 border-l-neon-red shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-neon-red/10 rounded-2xl border border-neon-red/30">
                       <Activity className="text-neon-red w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-base font-display font-black text-white tracking-widest uppercase">Anomaly Trend Signature</h3>
                       <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black mt-1">Real-time Environmental Analytics</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="flex items-baseline gap-2">
                       <span className="text-5xl font-display font-black text-neon-red tracking-tighter leading-none">+8.2°</span>
                       <span className="text-2xl font-light text-slate-600">C</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex-1 bg-black/40 rounded-3xl border border-white/10 p-8 relative h-[280px] group">
                {isLoaded ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                      <defs>
                        <linearGradient id="anomColorDetail" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff2e2e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ff2e2e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                      <XAxis dataKey="day" hide />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ff2e2e', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      <Area type="monotone" dataKey="temp" stroke="#ff2e2e" strokeWidth={5} fillOpacity={1} fill="url(#anomColorDetail)" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-neon-red/20 border-t-neon-red rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* SYSTEM LOGS */}
                <div className="absolute top-6 right-6 text-[8px] font-mono text-slate-500 bg-black/60 p-4 rounded-xl border border-white/10 w-48 backdrop-blur-xl shadow-2xl pointer-events-none">
                   <div className="space-y-1.5 overflow-hidden">
                      {systemLogs.slice(0, 4).map((log, i) => (
                        <p key={i} className={`transition-all duration-700 ${i === logIndex % 4 ? 'opacity-100 text-neon-red/80' : 'opacity-20'}`}>
                          {log}
                        </p>
                      ))}
                   </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - UPGRADED METRICS WITH DETAIL */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <GlassPanel className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-lg font-display font-black text-white tracking-[0.2em] uppercase">Node BH-07</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={10} className="text-neon-cyan" />
                    <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">Sector Alpha-1</span>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:rotate-12 transition-transform">
                   <Sun size={36} className="text-neon-yellow animate-spin-slow opacity-80" />
                </div>
              </div>
              <div className="mb-12">
                <div className="flex items-baseline gap-2">
                  <span className="text-8xl font-display font-black text-white tracking-tighter leading-none">{temperature}</span>
                  <span className="text-4xl font-light text-slate-700">°C</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-black/60 rounded-2xl border border-white/5 group/s">
                  <Wind size={20} className="text-slate-500 mb-3 group-hover/s:text-neon-cyan transition-colors" />
                  <p className="text-[9px] font-mono font-black text-slate-600 uppercase mb-1">Wind Speed</p>
                  <p className="text-2xl font-display font-black text-white">4.2 <span className="text-[11px] text-slate-600">M/S</span></p>
                </div>
                <div className="p-5 bg-black/60 rounded-2xl border border-white/5 group/s">
                  <Droplets size={20} className="text-slate-500 mb-3 group-hover/s:text-neon-cyan transition-colors" />
                  <p className="text-[9px] font-mono font-black text-slate-600 uppercase mb-1">Humidity</p>
                  <p className="text-2xl font-display font-black text-white">45 <span className="text-[11px] text-slate-600">%</span></p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {/* UPGRADED AIR QUALITY */}
            <GlassPanel className="p-8 rounded-[2rem] bg-slate-950/40 border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 blur-3xl pointer-events-none"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-neon-purple/10 rounded-xl border border-neon-purple/20">
                    <Gauge className="text-neon-purple w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-base font-display font-black text-white uppercase tracking-widest">Air Quality</span>
                    <p className="text-[9px] font-mono text-slate-500 font-bold uppercase mt-0.5">PM2.5 / Particulate Hub</p>
                  </div>
                </div>
                <span className="bg-neon-purple/20 px-3 py-1 rounded-lg text-[10px] font-mono font-black text-neon-purple uppercase border border-neon-purple/30">POOR</span>
              </div>
              
              <div className="flex items-end justify-between relative z-10">
                 <div>
                    <span className="text-6xl font-display font-black text-white tracking-tighter leading-none">{aqi}</span>
                    <div className="mt-4 flex items-center gap-3">
                       <MoveUpRight size={12} className="text-neon-red" />
                       <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Rising Trend</span>
                    </div>
                 </div>
                 <div className="w-32 h-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={miniChartData}>
                          <Bar dataKey="val" fill="#bf40bf" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4 relative z-10">
                 <div>
                    <p className="text-[8px] font-mono text-slate-600 font-black uppercase tracking-widest mb-1">PM2.5 DENSITY</p>
                    <p className="text-sm font-black text-white">82.4 <span className="text-[9px] text-slate-600 font-mono">µg/m³</span></p>
                 </div>
                 <div>
                    <p className="text-[8px] font-mono text-slate-600 font-black uppercase tracking-widest mb-1">CO2 LEVELS</p>
                    <p className="text-sm font-black text-white">412 <span className="text-[9px] text-slate-600 font-mono">PPM</span></p>
                 </div>
              </div>
            </GlassPanel>
            
            {/* UPGRADED UV & VISIBILITY */}
            <div className="grid grid-cols-2 gap-6">
              <GlassPanel className="p-6 rounded-[1.5rem] flex flex-col items-center border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/5 to-transparent pointer-events-none"></div>
                <Zap size={20} className="text-neon-yellow mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-mono font-black text-slate-500 uppercase mb-2">UV-B Index</p>
                <div className="text-center">
                   <p className="text-3xl font-display font-black text-white leading-none">8.4</p>
                   <p className="text-[8px] font-mono text-neon-yellow font-black uppercase mt-2 tracking-widest bg-neon-yellow/10 px-2 py-0.5 rounded-full">Extreme</p>
                </div>
              </GlassPanel>
              
              <GlassPanel className="p-6 rounded-[1.5rem] flex flex-col items-center border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent pointer-events-none"></div>
                <Eye size={20} className="text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-mono font-black text-slate-500 uppercase mb-2">Visibility</p>
                <div className="text-center">
                   <p className="text-3xl font-display font-black text-white leading-none">10.0</p>
                   <p className="text-[8px] font-mono text-neon-green font-black uppercase mt-2 tracking-widest bg-neon-green/10 px-2 py-0.5 rounded-full">Clear</p>
                </div>
              </GlassPanel>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FORECAST */}
      <motion.div variants={itemVariants}>
        <GlassPanel className="p-12 rounded-[3rem] border-white/5 shadow-2xl relative overflow-hidden bg-slate-950/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                <TrendingUp className="text-neon-cyan w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-black text-white tracking-widest uppercase leading-tight">7-Day Urban Projection</h3>
            </div>
          </div>
          <div className="h-[450px] w-full bg-black/40 rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden shadow-inner">
            {isLoaded ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569', fontWeight: '900' }} dy={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569', fontWeight: '900' }} tickFormatter={(val) => `${val}°`} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(6, 11, 19, 0.95)', border: '1px solid #1e293b', borderRadius: '24px' }} />
                  <Line type="monotone" dataKey="max" stroke="#fbbf24" strokeWidth={6} dot={{ r: 7 }} isAnimationActive={false} />
                  <Line type="monotone" dataKey="min" stroke="#00f5ff" strokeWidth={6} dot={{ r: 7 }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </motion.div>
  )
}
