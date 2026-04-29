import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '../ui/GlassPanel';
import { useTrafficStore } from '../../store/trafficStore';
import { useTrafficSimulation } from '../../hooks/useTrafficSimulation';
import { 
  Activity, Zap, AlertTriangle, TrendingUp, Radio, 
  Settings, Play, Square, FastForward, Navigation, 
  MapPin, ShieldCheck, Clock, Car, Gauge, Camera,
  RefreshCw, MousePointer2, ChevronRight, X, LocateFixed, Search
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrafficToast } from '../ui/TrafficToast';

export function TrafficIntelligencePanel() {
  useTrafficSimulation();
  const { 
    nodes, cityMetrics, aiLog, simulationActive, 
    setSimulationActive, injectEvent, clearAllEvents,
    selectedNodeId, setSelectedNodeId, incidents,
    startNodeId, setStartNodeId, endNodeId, setEndNodeId,
    calculateRoute, navigationRoute, addToast, addAILog, nodes: allNodes
  } = useTrafficStore();

  const [selectedNodeIdSim, setSelectedNodeIdSim] = useState(nodes[0].id);
  const [selectedEvent, setSelectedEvent] = useState('Heavy Congestion');
  const [intensity, setIntensity] = useState(7);

  // Sync simulation target with map selection
  useEffect(() => {
    if (selectedNodeId) {
      setSelectedNodeIdSim(selectedNodeId);
    }
  }, [selectedNodeId]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="w-full h-full relative pointer-events-none">
      <TrafficToast />

      {/* NAVIGATION HUB (Top-Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] pointer-events-auto">
        <GlassPanel className="p-3 border-white/10 flex items-center gap-4 bg-slate-950/80">
          <div className="flex-1 flex items-center gap-3 bg-black/40 rounded-xl px-4 py-2 border border-white/5">
            <LocateFixed size={14} className="text-neon-cyan" />
            <div className="flex-1">
              <p className="text-[7px] font-mono text-slate-500 uppercase">Your Location</p>
              <select 
                value={startNodeId || ''} 
                onChange={(e) => setStartNodeId(e.target.value)}
                className="w-full bg-transparent border-none text-[10px] text-white outline-none font-black uppercase appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Start</option>
                {nodes.map(n => <option key={n.id} value={n.id} className="bg-slate-900">{n.name}</option>)}
              </select>
            </div>
          </div>

          <div className="text-neon-cyan/30 flex items-center px-1">
            <ChevronRight size={16} />
          </div>

          <div className="flex-1 flex items-center gap-3 bg-black/40 rounded-xl px-4 py-2 border border-white/5">
            <Search size={14} className="text-neon-purple" />
            <div className="flex-1">
              <p className="text-[7px] font-mono text-slate-500 uppercase">Where To?</p>
              <select 
                value={endNodeId || ''} 
                onChange={(e) => setEndNodeId(e.target.value)}
                className="w-full bg-transparent border-none text-[10px] text-white outline-none font-black uppercase appearance-none cursor-pointer"
              >
                <option value="" disabled>Destination</option>
                {nodes.map(n => <option key={n.id} value={n.id} className="bg-slate-900">{n.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={calculateRoute}
              disabled={!startNodeId || !endNodeId}
              title="Calculate Internal Route"
              className={`p-3 rounded-xl transition-all ${
                startNodeId && endNodeId 
                  ? 'bg-neon-cyan text-black hover:scale-105 shadow-[0_0_15px_rgba(0,245,255,0.4)]' 
                  : 'bg-white/5 text-slate-600'
              }`}
            >
              <Navigation size={18} fill="currentColor" />
            </button>

            {startNodeId && endNodeId && (
              <button 
                onClick={() => {
                  const start = nodes.find(n => n.id === startNodeId);
                  const end = nodes.find(n => n.id === endNodeId);
                  if (start && end) {
                    window.open(`https://www.google.com/maps/dir/${start.lat},${start.lng}/${end.lat},${end.lng}`, '_blank');
                  }
                }}
                title="Open in Google Maps"
                className="p-3 rounded-xl bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)]"
              >
                <Search size={18} />
              </button>
            )}
          </div>
        </GlassPanel>
      </div>

      {/* PANEL A - TRAFFIC COMMAND (Top-Left) */}
      <div className="absolute top-0 left-0 w-80 pointer-events-auto flex flex-col gap-4">
        <GlassPanel className="p-5 border-neon-cyan/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-black text-xs text-white tracking-widest uppercase">
              {selectedNode ? `${selectedNode.id} Intelligence` : 'City Traffic Intelligence'}
            </h3>
            <div className={`w-2 h-2 rounded-full animate-pulse ${selectedNode ? 'bg-neon-purple' : 'bg-neon-cyan'}`}></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[8px] font-mono text-slate-500 uppercase">{selectedNode ? 'Node Vehicles' : 'Total Vehicles'}</p>
              <h4 className="text-lg font-black text-white">
                {selectedNode ? selectedNode.vehicleCount : cityMetrics.totalVehicles.toLocaleString()}
              </h4>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[8px] font-mono text-slate-500 uppercase">{selectedNode ? 'Current Speed' : 'Avg City Speed'}</p>
              <h4 className="text-lg font-black text-neon-green">
                {selectedNode ? selectedNode.avgSpeed : cityMetrics.avgSpeed} km/h
              </h4>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[8px] font-mono text-slate-500 uppercase">{selectedNode ? 'Congestion' : 'Active Incidents'}</p>
              <h4 className={`text-lg font-black ${ (selectedNode ? selectedNode.congestionIndex > 70 : cityMetrics.activeIncidents > 0) ? 'text-neon-red' : 'text-white'}`}>
                {selectedNode ? `${selectedNode.congestionIndex}%` : cityMetrics.activeIncidents}
              </h4>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[8px] font-mono text-slate-500 uppercase">{selectedNode ? 'Signal Phase' : 'AI Overrides'}</p>
              <h4 className={`text-lg font-black ${selectedNode ? (selectedNode.signalPhase === 'RED' ? 'text-neon-red' : 'text-neon-green') : 'text-neon-cyan'}`}>
                {selectedNode ? selectedNode.signalPhase : cityMetrics.signalOverrides}
              </h4>
            </div>
          </div>

          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cityMetrics.flowHistory}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#00f5ff" strokeWidth={2} fill="url(#colorFlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </div>

      {/* PANEL B - NODE STATUS LIST (Bottom-Left) */}
      <div className="absolute bottom-0 left-0 w-72 pointer-events-auto max-h-[40vh] flex flex-col gap-4">
        <GlassPanel className="p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 bg-black/20 shrink-0">
            <h3 className="font-display font-black text-[10px] text-slate-400 tracking-widest uppercase">Monitoring Nodes — {nodes.length} Active</h3>
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {nodes.map(node => (
              <button 
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`w-full p-4 border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors text-left ${selectedNodeId === node.id ? 'bg-neon-cyan/5 border-l-2 border-l-neon-cyan' : ''}`}
              >
                <div>
                  <p className="text-[9px] font-mono text-neon-cyan font-bold">{node.id}</p>
                  <p className="text-xs font-bold text-white truncate w-32">{node.name}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                    node.status === 'clear' ? 'text-neon-green border-neon-green/20 bg-neon-green/10' :
                    node.status === 'heavy' ? 'text-neon-yellow border-neon-yellow/20 bg-neon-yellow/10' :
                    'text-neon-red border-neon-red/20 bg-neon-red/10'
                  }`}>
                    {node.status}
                  </span>
                  <p className="text-[9px] font-mono text-slate-500 mt-1">{node.vehicleCount} vcl</p>
                </div>
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* PANEL C - AI INTELLIGENCE FEED (Top-Right) */}
      <div className="absolute top-0 right-0 w-72 pointer-events-auto flex flex-col gap-4">
        <GlassPanel className="p-0 overflow-hidden flex flex-col max-h-[300px]">
          <div className="p-4 border-b border-white/5 bg-black/20 shrink-0 flex items-center gap-2">
            <Activity size={14} className="text-neon-cyan" />
            <h3 className="font-display font-black text-[10px] text-white tracking-widest uppercase">AI Decision Log</h3>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
            <AnimatePresence initial={false}>
              {aiLog.map(log => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`p-3 bg-white/5 rounded-lg border-l-2 text-[10px] leading-relaxed ${
                    log.type === 'action' ? 'border-l-neon-green' :
                    log.type === 'warning' ? 'border-l-neon-yellow' :
                    log.type === 'alert' ? 'border-l-neon-red' : 'border-l-neon-cyan'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-mono text-slate-500">{log.timestamp}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      log.type === 'action' ? 'bg-neon-green' :
                      log.type === 'warning' ? 'bg-neon-yellow' :
                      log.type === 'alert' ? 'bg-neon-red' : 'bg-neon-cyan'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 font-medium">{log.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </GlassPanel>
      </div>

      {/* SIMULATION CONTROL CENTER (Bottom-Right) */}
      <div className="absolute bottom-0 right-0 w-80 pointer-events-auto flex flex-col gap-4">
        <GlassPanel className="p-5 border-neon-purple/30 bg-slate-950/80">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={16} className="text-neon-purple" />
            <h3 className="font-display font-black text-xs text-white tracking-widest uppercase">Simulation Lab</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[8px] font-mono text-slate-500 uppercase block mb-2">Target Node</label>
              <select 
                value={selectedNodeIdSim}
                onChange={(e) => setSelectedNodeIdSim(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-neon-purple/50 font-mono"
              >
                {nodes.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[8px] font-mono text-slate-500 uppercase block mb-2">Event Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Heavy Congestion', 'Road Blockage', 'Accident', 'Signal Failure'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedEvent(type)}
                    className={`p-2 rounded-lg border text-[9px] font-mono uppercase transition-all ${
                      selectedEvent === type ? 'bg-neon-purple/20 border-neon-purple text-white' : 'bg-white/5 border-white/5 text-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[8px] font-mono text-slate-500 uppercase">Intensity</label>
                <span className="text-[10px] font-mono text-neon-purple font-black">{intensity}</span>
              </div>
              <input 
                type="range" min="1" max="10" 
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full accent-neon-purple h-1 bg-white/10 rounded-lg appearance-none"
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => injectEvent(selectedNodeIdSim, selectedEvent, intensity)}
                className="flex-1 py-3 bg-neon-red/20 border border-neon-red/40 rounded-xl text-neon-red text-[10px] font-black uppercase tracking-widest hover:bg-neon-red hover:text-white transition-all shadow-[0_0_15px_rgba(255,42,42,0.2)]"
              >
                Inject Event
              </button>
              <button 
                onClick={clearAllEvents}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-black">Auto-Simulate</span>
                <button 
                  onClick={() => setSimulationActive(!simulationActive)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${simulationActive ? 'bg-neon-green' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${simulationActive ? 'left-6' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="space-y-2">
                {incidents.slice(0, 3).map(inc => (
                  <div key={inc.id} className="flex items-center justify-between p-2 bg-black/40 rounded-lg border border-white/5">
                    <div>
                      <p className="text-[8px] font-mono text-neon-red font-black uppercase">{inc.type}</p>
                      <p className="text-[9px] font-bold text-white">{nodes.find(n => n.id === inc.nodeId)?.name}</p>
                    </div>
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded border border-neon-green/30 text-neon-green bg-neon-green/10">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* NODE DETAIL PANEL (SIDE DRAWER) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[400px] h-full bg-slate-950/95 border-l border-white/10 shadow-2xl z-[500] pointer-events-auto p-8 overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-neon-cyan font-mono text-xs font-black tracking-widest uppercase">{selectedNode.id}</p>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mt-1">{selectedNode.name}</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">{selectedNode.lat}, {selectedNode.lng}</p>
              </div>
              <button onClick={() => setSelectedNodeId(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Car size={14} className="text-neon-cyan" />
                    <p className="text-[10px] font-mono text-slate-500 uppercase font-black">Vehicle Count</p>
                  </div>
                  <h4 className="text-2xl font-black text-white">{selectedNode.vehicleCount}</h4>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge size={14} className={selectedNode.avgSpeed > 40 ? 'text-neon-green' : selectedNode.avgSpeed > 20 ? 'text-neon-yellow' : 'text-neon-red'} />
                    <p className="text-[10px] font-mono text-slate-500 uppercase font-black">Avg Speed</p>
                  </div>
                  <h4 className="text-2xl font-black text-white">{selectedNode.avgSpeed} <span className="text-xs text-slate-500">km/h</span></h4>
                </div>
              </div>

              <GlassPanel className="p-6 bg-black/40 border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-black text-xs text-white uppercase tracking-widest">Congestion Index</h3>
                  <span className={`text-xl font-black ${selectedNode.congestionIndex > 70 ? 'text-neon-red' : selectedNode.congestionIndex > 40 ? 'text-neon-yellow' : 'text-neon-green'}`}>
                    {selectedNode.congestionIndex}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      selectedNode.congestionIndex > 70 ? 'bg-neon-red' : 
                      selectedNode.congestionIndex > 40 ? 'bg-neon-yellow' : 'bg-neon-green'
                    }`}
                    style={{ width: `${selectedNode.congestionIndex}%` }}
                  ></div>
                </div>
              </GlassPanel>

              <GlassPanel className="p-6 bg-black/40 border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-black text-xs text-white uppercase tracking-widest">Signal Phase</h3>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-500" />
                    <span className="text-lg font-mono font-black text-neon-cyan">{selectedNode.signalTimer}s</span>
                  </div>
                </div>
                <div className="flex gap-4 justify-center py-4 bg-black/60 rounded-3xl border border-white/10 shadow-inner">
                  <div className={`w-8 h-8 rounded-full shadow-2xl transition-all duration-300 ${selectedNode.signalPhase === 'RED' ? 'bg-neon-red shadow-[0_0_20px_#ff2a2a]' : 'bg-red-950'}`}></div>
                  <div className={`w-8 h-8 rounded-full shadow-2xl transition-all duration-300 ${selectedNode.signalPhase === 'YELLOW' ? 'bg-neon-yellow shadow-[0_0_20px_#fbbf24]' : 'bg-yellow-950'}`}></div>
                  <div className={`w-8 h-8 rounded-full shadow-2xl transition-all duration-300 ${selectedNode.signalPhase === 'GREEN' ? 'bg-neon-green shadow-[0_0_20px_#39ff14]' : 'bg-green-950'}`}></div>
                </div>
              </GlassPanel>

              <div className="p-0 rounded-2xl border border-white/10 bg-black/40 overflow-hidden group">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Camera size={14} className="text-neon-cyan" />
                      <p className="text-[10px] font-mono text-white font-black uppercase">CCTV FEED — {selectedNode.id}</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse"></div>
                      <span className="text-[8px] font-black text-neon-red uppercase">LIVE</span>
                   </div>
                </div>
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60"></div>
                  <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-500 bg-black/60 px-2 py-1 rounded">CAM_SOURCE::BPL_STREET_NET_04</div>
                  <div className="w-full h-px bg-white/5 absolute top-1/2 -translate-y-1/2"></div>
                  <div className="h-full w-px bg-white/5 absolute left-1/2 -translate-x-1/2"></div>
                  <TrendingUp className="text-slate-800 w-16 h-16 opacity-20" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => injectEvent(selectedNode.id, 'Accident', 10)}
                  className="w-full py-4 rounded-xl border border-neon-red/30 bg-neon-red/10 text-neon-red text-xs font-black uppercase tracking-widest hover:bg-neon-red hover:text-white transition-all shadow-[0_0_15px_rgba(255,42,42,0.1)]"
                >
                  Report Accident
                </button>
                <button 
                  onClick={() => {
                    useTrafficStore.setState(state => ({
                      nodes: state.nodes.map(n => n.id === selectedNode.id ? { ...n, signalPhase: 'GREEN', signalTimer: 60 } : n)
                    }));
                    addAILog(`Manual signal override: ${selectedNode.name} forced to GREEN.`, 'action');
                    addToast(`🚦 Signal Override — ${selectedNode.name} is now GREEN`);
                  }}
                  className="w-full py-4 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-black uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all"
                >
                  Force Green Signal
                </button>
                <button 
                  onClick={() => {
                    addAILog(`Traffic police dispatched to ${selectedNode.name} for manual flow control.`, 'info');
                    addToast(`👮 Dispatching Unit — Response team sent to ${selectedNode.name}`);
                  }}
                  className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Dispatch Traffic Police
                </button>
                <button 
                  onClick={clearAllEvents}
                  className="w-full py-4 rounded-xl border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-black uppercase tracking-widest hover:bg-neon-green hover:text-black transition-all"
                >
                  Mark as Cleared
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
