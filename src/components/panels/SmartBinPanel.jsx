import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle, Activity, Truck, Battery, MapPin, MoreHorizontal } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { GlassPanel } from '../ui/GlassPanel';

const ZONES = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
const LOCATIONS = ['MP Nagar', 'Arera Colony', 'BHEL', 'Kolar Road', 'Habibganj', 'TT Nagar'];

const generateInitialBins = () => {
  return Array.from({ length: 47 }, (_, i) => {
    const fillLevel = Math.floor(Math.random() * 80) + 10;
    return {
      id: `EC-BIN-${100 + i}`,
      zone: ZONES[Math.floor(Math.random() * ZONES.length)],
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      fillLevel,
      status: fillLevel >= 85 ? 'critical' : fillLevel >= 50 ? 'warning' : 'normal',
      battery: Math.floor(Math.random() * 40) + 60,
    };
  }).sort((a, b) => b.fillLevel - a.fillLevel);
};

const fillTrendData = [
  { day: 'Mon', avgFill: 55, critical: 20 },
  { day: 'Tue', avgFill: 60, critical: 25 },
  { day: 'Wed', avgFill: 62, critical: 32 },
  { day: 'Thu', avgFill: 58, critical: 28 },
  { day: 'Fri', avgFill: 65, critical: 38 },
  { day: 'Sat', avgFill: 62, critical: 32 },
  { day: 'Sun', avgFill: 48, critical: 45 },
];

const zoneData = [
  { name: 'Zone A', value: 65, color: '#a78bfa' },
  { name: 'Zone B', value: 48, color: '#fbbf24' },
  { name: 'Zone C', value: 72, color: '#38bdf8' },
  { name: 'Zone D', value: 62, color: '#00e87a' },
];

const wasteTypeData = [
  { type: 'Organic', value: 42, color: '#00e87a' },
  { type: 'Plastic', value: 25, color: '#38bdf8' },
  { type: 'Paper', value: 18, color: '#fbbf24' },
  { type: 'Glass', value: 10, color: '#a78bfa' },
  { type: 'Metal', value: 5, color: '#ff4d6d' },
];

export default function SmartBinPanel() {
  const [bins, setBins] = useState([]);
  
  useEffect(() => {
    setBins(generateInitialBins());
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setBins(current => {
        let updated = current.map(bin => {
          if (bin.fillLevel >= 100) return { ...bin, fillLevel: 0, status: 'normal' }; // simulate pickup
          const newFill = bin.fillLevel + Math.random() * 2;
          return {
            ...bin,
            fillLevel: newFill,
            status: newFill >= 85 ? 'critical' : newFill >= 50 ? 'warning' : 'normal'
          };
        });
        return updated.sort((a, b) => b.fillLevel - a.fillLevel);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalBins: bins.length,
    criticalBins: bins.filter(b => b.fillLevel >= 85).length,
    avgFillLevel: bins.length ? Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length) : 0,
    pickupsToday: 38
  };

  const alerts = bins.filter(b => b.fillLevel > 90).slice(0, 5).map((b, i) => ({
    id: i,
    type: 'critical',
    msg: `Bin ${b.id} at ${b.location} exceeded 90% capacity! Dispatching truck.`,
    time: 'Just now'
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6 pointer-events-auto w-full h-full overflow-y-auto no-scrollbar pb-20"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight flex items-center gap-3">
            <Trash2 className="text-neon-green" size={32} />
            Smart Waste Management
          </h2>
          <p className="text-slate-400 mt-2 tracking-wide text-sm font-medium">Real-time solid waste infrastructure monitoring and IoT routing</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <GlassPanel className="p-6 border-neon-green/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Active Bins</h3>
            <Trash2 className="text-neon-green" size={20} />
          </div>
          <div className="text-4xl font-mono font-black text-white">{stats.totalBins || 47}</div>
          <div className="text-neon-green text-xs font-black tracking-widest mt-2">↑ 12 NEW THIS MONTH</div>
        </GlassPanel>

        <GlassPanel className="p-6 border-neon-red/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Critical Bins (&gt;85%)</h3>
            <AlertTriangle className="text-neon-red" size={20} />
          </div>
          <div className="text-4xl font-mono font-black text-white">{stats.criticalBins}</div>
          <div className="text-neon-red text-xs font-black tracking-widest mt-2">↑ {stats.criticalBins} REQUIRES PICKUP</div>
        </GlassPanel>

        <GlassPanel className="p-6 border-neon-yellow/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Avg Fill Level</h3>
            <Activity className="text-neon-yellow" size={20} />
          </div>
          <div className="text-4xl font-mono font-black text-white">{stats.avgFillLevel}%</div>
          <div className="text-slate-400 text-xs font-black tracking-widest mt-2">- STABLE TREND</div>
        </GlassPanel>

        <GlassPanel className="p-6 border-neon-cyan/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Pickups Today</h3>
            <Truck className="text-neon-cyan" size={20} />
          </div>
          <div className="text-4xl font-mono font-black text-white">{stats.pickupsToday}</div>
          <div className="text-neon-cyan text-xs font-black tracking-widest mt-2">↑ 8 VS AVERAGE</div>
        </GlassPanel>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-3 gap-6">
        <GlassPanel className="p-6 col-span-2">
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Fill Level Trend (7-Day)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fillTrendData}>
                <defs>
                  <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="avgFill" stroke="#00f5ff" strokeWidth={3} fillOpacity={1} fill="url(#colorFill)" />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} dot={{fill: '#ef4444', strokeWidth: 2}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Zone Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {zoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {zoneData.map((z) => (
                <div key={z.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: z.color }}></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{z.name}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Critical Bins Table & Alerts */}
      <div className="grid grid-cols-3 gap-6">
        <GlassPanel className="p-0 col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Top Critical Bins (&gt;85%)</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Bin ID</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Zone</th>
                  <th className="px-6 py-4">Battery</th>
                  <th className="px-6 py-4">Fill Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bins.slice(0, 5).map((bin) => (
                  <tr key={bin.id} className="hover:bg-white/5 transition-all">
                    <td className="px-6 py-4 font-black text-neon-cyan text-xs font-mono">{bin.id}</td>
                    <td className="px-6 py-4 text-white font-medium text-sm">{bin.location}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-medium">{bin.zone}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Battery size={14} className={bin.battery < 20 ? 'text-neon-red' : 'text-neon-green'} />
                        <span className="font-mono text-xs font-bold text-white">{bin.battery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${bin.fillLevel > 85 ? 'bg-neon-red shadow-[0_0_8px_rgba(239,68,68,0.6)]' : bin.fillLevel > 50 ? 'bg-neon-yellow' : 'bg-neon-green'}`} 
                            style={{ width: `${Math.min(100, bin.fillLevel)}%` }}
                          ></div>
                        </div>
                        <span className={`font-mono text-xs font-bold ${bin.fillLevel > 85 ? 'text-neon-red' : 'text-white'}`}>
                          {Math.round(bin.fillLevel)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Active Alerts Feed</h3>
          <div className="flex flex-col gap-4">
            {alerts.length > 0 ? alerts.map(alert => (
              <div key={alert.id} className="flex gap-3 p-4 rounded-xl border border-neon-red/20 bg-neon-red/5">
                <AlertTriangle className="text-neon-red shrink-0" size={16} />
                <div>
                  <p className="text-sm font-medium text-white/90 leading-snug">{alert.msg}</p>
                  <span className="font-mono text-[10px] text-slate-500 mt-2 block uppercase">{alert.time}</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-3">
                  <Activity className="text-neon-green" size={20} />
                </div>
                <p className="text-slate-400 text-sm font-medium">All systems normal.<br/>No critical alerts.</p>
              </div>
            )}
          </div>
        </GlassPanel>
      </div>

      {/* Fleet Status */}
      <div className="grid grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Waste Composition</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteTypeData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{fill: '#ffffff90', fontSize: 12}} width={70} />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 flex flex-col">
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Active Fleet Status</h3>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/5">
              <div className="flex items-center gap-4">
                <Truck className="text-neon-green" size={20} />
                <div>
                  <div className="text-sm font-bold font-mono text-white">ECO-TRK-01</div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Zone A • MP Nagar</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-[10px] font-black uppercase tracking-widest">
                Active Routing
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/5">
              <div className="flex items-center gap-4">
                <Truck className="text-neon-red" size={20} />
                <div>
                  <div className="text-sm font-bold font-mono text-white">ECO-TRK-02</div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Zone C • BHEL</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full border border-neon-red/30 bg-neon-red/10 text-neon-red text-[10px] font-black uppercase tracking-widest">
                Delayed
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/5">
              <div className="flex items-center gap-4">
                <Truck className="text-neon-green" size={20} />
                <div>
                  <div className="text-sm font-bold font-mono text-white">ECO-TRK-03</div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Zone B • Arera Colony</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-[10px] font-black uppercase tracking-widest">
                Active Routing
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>

    </motion.div>
  );
}
