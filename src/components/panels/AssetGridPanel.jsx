import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { 
  Grid, Lightbulb, Camera, Wifi, Settings, Activity, Server, Zap, Battery,
  AlertTriangle, Filter, Search, ChevronRight, CheckCircle2, LayoutGrid, List
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

const ASSET_CATEGORIES = [
  { id: 'all', label: 'All Assets' },
  { id: 'lights', label: 'Smart Lights' },
  { id: 'cctv', label: 'CCTV Nodes' },
  { id: 'wifi', label: 'WiFi Hotspots' },
  { id: 'sensors', label: 'IoT Sensors' },
];

const ASSET_DATA = [
  { id: 'SL-010', type: 'lights', name: 'Smart Pole Alpha', location: 'MP Nagar', status: 'Online', battery: 98, uptime: '99.9%' },
  { id: 'CT-404', type: 'cctv', name: 'Traffic Cam 4', location: 'Arera Colony', status: 'Warning', battery: 45, uptime: '85.2%' },
  { id: 'WF-112', type: 'wifi', name: 'Public Hotspot B', location: 'New Market', status: 'Online', battery: 100, uptime: '99.9%' },
  { id: 'IS-991', type: 'sensors', name: 'AQI Sensor M', location: 'Habibganj', status: 'Offline', battery: 5, uptime: '42.1%' },
  { id: 'SL-011', type: 'lights', name: 'Smart Pole Beta', location: 'MP Nagar', status: 'Online', battery: 95, uptime: '99.5%' },
  { id: 'CT-405', type: 'cctv', name: 'Traffic Cam 5', location: 'BHEL', status: 'Online', battery: 88, uptime: '98.0%' },
];

const MAINTENANCE_LOGS = [
  { id: 'JOB-9012', asset: 'AQI Sensor M', task: 'Battery Replacement', urgency: 'Critical', time: 'Overdue' },
  { id: 'JOB-9013', asset: 'Traffic Cam 4', task: 'Lens Cleaning', urgency: 'Medium', time: 'In 2 Hrs' },
  { id: 'JOB-9014', asset: 'Smart Pole Beta', task: 'Firmware Patch', urgency: 'Low', time: 'Tomorrow' },
];

const PERFORMANCE_DATA = [
  { time: '00:00', load: 30, efficiency: 95 },
  { time: '04:00', load: 25, efficiency: 98 },
  { time: '08:00', load: 60, efficiency: 85 },
  { time: '12:00', load: 95, efficiency: 70 },
  { time: '16:00', load: 85, efficiency: 75 },
  { time: '20:00', load: 50, efficiency: 90 },
];

const ENERGY_DATA = [
  { name: 'Lights', value: 4500, color: '#fbbf24' },
  { name: 'CCTV', value: 3200, color: '#00f5ff' },
  { name: 'WiFi', value: 1500, color: '#7551ff' },
  { name: 'Sensors', value: 800, color: '#10b981' },
];

export function AssetGridPanel() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredAssets = useMemo(() => {
    return ASSET_DATA.filter(asset => {
      const matchCat = activeCategory === 'all' || asset.type === activeCategory;
      const matchSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full h-full flex flex-col gap-6 pointer-events-auto overflow-y-auto custom-scrollbar pb-32 p-4"
    >
      {/* HEADER */}
      <GlassPanel className="p-6 border-white/10 bg-slate-950/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] overflow-hidden relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-neon-purple/10 rounded-2xl flex items-center justify-center border border-neon-purple/30 shadow-[0_0_20px_rgba(117,81,255,0.2)]">
            <Server className="text-neon-purple w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-black text-white tracking-tighter uppercase leading-none">
              ASSET <span className="text-neon-purple">GRID</span>
            </h1>
            <p className="text-slate-400 font-mono text-[9px] uppercase font-black tracking-[0.2em] mt-2">Central Infrastructure Repository</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 bg-black/40 p-2 rounded-2xl border border-white/5">
          {ASSET_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(117,81,255,0.4)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </GlassPanel>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
        {[
          { label: 'Total Assets', value: '18,694', sub: 'Deployed Nodes', icon: Grid, color: 'text-white' },
          { label: 'Operational Uptime', value: '99.8%', sub: 'System Health', icon: CheckCircle2, color: 'text-neon-green' },
          { label: 'Critical Alerts', value: '14', sub: 'Action Required', icon: AlertTriangle, color: 'text-neon-red' },
          { label: 'Energy Draw', value: '10.5 MW', sub: 'Current Load', icon: Zap, color: 'text-neon-yellow' },
        ].map((kpi, i) => (
          <GlassPanel key={i} className="p-6 border-white/5 rounded-[2rem] bg-slate-950/40 hover:bg-slate-900/60 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20">
                <kpi.icon size={20} className={kpi.color} />
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black mb-1">{kpi.label}</p>
            <h3 className="text-4xl font-display font-black text-white">{kpi.value}</h3>
            <p className="text-xs text-slate-400 mt-2 font-medium">{kpi.sub}</p>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[600px] shrink-0">
        {/* ASSET INVENTORY (2/3 width) */}
        <GlassPanel className="p-0 border-white/5 rounded-[2.5rem] bg-slate-950/40 col-span-1 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search node ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[10px] font-mono text-white placeholder-slate-600 outline-none focus:border-neon-purple/50 w-64 uppercase"
                  />
               </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
               <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
                 <LayoutGrid size={16} />
               </button>
               <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
                 <List size={16} />
               </button>
            </div>
          </div>

          <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredAssets.map(asset => (
                  <div 
                    key={asset.id} 
                    onClick={() => setSelectedAsset(asset)}
                    className="p-5 rounded-2xl border border-white/10 bg-black/30 hover:border-neon-purple/30 transition-colors group cursor-pointer hover:shadow-[0_0_20px_rgba(117,81,255,0.1)]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-neon-purple/10">
                        {asset.type === 'lights' && <Lightbulb size={20} className="text-neon-yellow" />}
                        {asset.type === 'cctv' && <Camera size={20} className="text-neon-cyan" />}
                        {asset.type === 'wifi' && <Wifi size={20} className="text-neon-blue" />}
                        {asset.type === 'sensors' && <Settings size={20} className="text-neon-green" />}
                      </div>
                      <span className={`text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        asset.status === 'Online' ? 'bg-neon-green/10 text-neon-green' : 
                        asset.status === 'Warning' ? 'bg-neon-yellow/10 text-neon-yellow' : 'bg-neon-red/10 text-neon-red'
                      }`}>{asset.status}</span>
                    </div>
                    <h4 className="font-display font-black text-white text-lg tracking-wide uppercase truncate">{asset.name}</h4>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1 mb-4">{asset.id} :: {asset.location}</p>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <div className="flex items-center gap-2">
                        <Battery size={14} className={asset.battery > 20 ? 'text-neon-green' : 'text-neon-red'} />
                        <span className="text-xs font-mono font-black text-slate-400">{asset.battery}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-neon-cyan" />
                        <span className="text-xs font-mono font-black text-slate-400">{asset.uptime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <th className="pb-4 font-black">ID / Asset</th>
                    <th className="pb-4 font-black">Location</th>
                    <th className="pb-4 font-black">Status</th>
                    <th className="pb-4 font-black text-right">Battery</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map(asset => (
                    <tr 
                      key={asset.id} 
                      onClick={() => setSelectedAsset(asset)}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="py-4">
                        <p className="font-display font-black text-white uppercase">{asset.name}</p>
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{asset.id}</p>
                      </td>
                      <td className="py-4 text-xs text-slate-400 font-medium">{asset.location}</td>
                      <td className="py-4">
                        <span className={`text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                          asset.status === 'Online' ? 'bg-neon-green/10 text-neon-green' : 
                          asset.status === 'Warning' ? 'bg-neon-yellow/10 text-neon-yellow' : 'bg-neon-red/10 text-neon-red'
                        }`}>{asset.status}</span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs font-mono font-black text-slate-300">{asset.battery}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </GlassPanel>

        {/* SIDEBAR ANALYTICS (1/3 width) */}
        <div className="col-span-1 flex flex-col gap-6">
          <GlassPanel className="p-6 border-white/5 rounded-[2rem] bg-slate-950/40">
            <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 shrink-0">
              <Activity size={14} className="text-neon-purple" /> Network Load vs Efficiency
            </h3>
            <div className="h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7551ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7551ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#02040a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="load" stroke="#7551ff" strokeWidth={3} fill="url(#colorLoad)" />
                  <Area type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} fill="none" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 border-white/5 rounded-[2rem] bg-slate-950/40 flex-1">
            <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Settings size={14} className="text-neon-yellow" /> Pending Maintenance
            </h3>
            <div className="flex flex-col gap-4">
              {MAINTENANCE_LOGS.map(log => (
                <div key={log.id} className="p-4 rounded-xl border border-white/5 bg-black/20 flex flex-col gap-3 group hover:border-white/20 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-display font-black text-white uppercase">{log.asset}</p>
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{log.id}</p>
                    </div>
                    <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded border ${
                      log.urgency === 'Critical' ? 'bg-neon-red/10 border-neon-red/20 text-neon-red' : 
                      log.urgency === 'Medium' ? 'bg-neon-yellow/10 border-neon-yellow/20 text-neon-yellow' : 
                      'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan'
                    }`}>{log.urgency}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <p className="text-[10px] font-medium text-slate-400">{log.task}</p>
                    <p className="text-[9px] font-mono font-black text-slate-500">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 rounded-xl border border-white/10 text-xs font-black text-white uppercase tracking-widest hover:bg-white/5 transition-colors">
              View All Logs
            </button>
          </GlassPanel>
        </div>
      </div>

      {/* DETAILED ASSET OVERLAY */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-slate-950 border-l border-white/10 shadow-2xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30">
                    {selectedAsset.type === 'lights' && <Lightbulb size={24} className="text-neon-yellow" />}
                    {selectedAsset.type === 'cctv' && <Camera size={24} className="text-neon-cyan" />}
                    {selectedAsset.type === 'wifi' && <Wifi size={24} className="text-neon-blue" />}
                    {selectedAsset.type === 'sensors' && <Settings size={24} className="text-neon-green" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-black text-white uppercase">{selectedAsset.name}</h2>
                    <p className="text-[10px] font-mono text-neon-purple uppercase tracking-widest mt-1">{selectedAsset.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <AlertTriangle className="text-slate-500 w-5 h-5 hidden" /> {/* Placeholder for X icon if needed, using custom close */}
                  <span className="text-slate-400 font-mono text-xs uppercase tracking-widest font-black">Close [X]</span>
                </button>
              </div>

              <div className="space-y-6">
                <GlassPanel className="p-5 border-white/5 bg-black/40">
                  <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-4">Hardware Diagnostics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">Status</span>
                      <span className={`text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        selectedAsset.status === 'Online' ? 'bg-neon-green/10 text-neon-green' : 
                        selectedAsset.status === 'Warning' ? 'bg-neon-yellow/10 text-neon-yellow' : 'bg-neon-red/10 text-neon-red'
                      }`}>{selectedAsset.status}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">Location</span>
                      <span className="text-xs text-white font-mono">{selectedAsset.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">Battery Level</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${selectedAsset.battery > 20 ? 'bg-neon-green' : 'bg-neon-red'}`} style={{ width: `${selectedAsset.battery}%` }}></div>
                        </div>
                        <span className="text-xs text-white font-mono">{selectedAsset.battery}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">Uptime</span>
                      <span className="text-xs text-neon-cyan font-mono">{selectedAsset.uptime}</span>
                    </div>
                  </div>
                </GlassPanel>

                <GlassPanel className="p-5 border-white/5 bg-black/40 flex flex-col gap-4">
                  <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Live Telemetry</h3>
                  <div className="h-32 w-full bg-slate-900/50 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={PERFORMANCE_DATA}>
                          <Area type="monotone" dataKey="load" stroke="#7551ff" fill="#7551ff" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <span className="text-xs font-mono font-black text-neon-purple tracking-widest uppercase z-10 animate-pulse">Receiving Data...</span>
                  </div>
                </GlassPanel>

                <button className="w-full py-4 rounded-xl bg-neon-purple/20 text-neon-purple font-black uppercase tracking-widest text-xs border border-neon-purple/30 hover:bg-neon-purple hover:text-white transition-colors shadow-[0_0_20px_rgba(117,81,255,0.2)]">
                  Initiate Remote Diagnostic
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
