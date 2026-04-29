import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { Brain, Zap, AlertTriangle, TrendingUp, Send, Bot, User, Activity, Database, Sparkles, ShieldAlert } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const FORECAST_DATA = [
  { time: '18:00', risk: 30, traffic: 45, power: 80 },
  { time: '20:00', risk: 45, traffic: 65, power: 85 },
  { time: '22:00', risk: 60, traffic: 30, power: 60 },
  { time: '00:00', risk: 25, traffic: 15, power: 45 },
  { time: '02:00', risk: 15, traffic: 10, power: 40 },
  { time: '04:00', risk: 20, traffic: 20, power: 50 },
  { time: '06:00', risk: 50, traffic: 75, power: 70 },
  { time: '08:00', risk: 85, traffic: 95, power: 90 },
]

const ANOMALIES = [
  { id: 'AN-991', type: 'Traffic', desc: 'Unusual congestion at Chetak Bridge', probability: '94%', time: 'In 15 mins', severity: 'High' },
  { id: 'AN-992', type: 'Power', desc: 'Voltage dip predicted in Arera Colony', probability: '82%', time: 'In 2 Hrs', severity: 'Medium' },
  { id: 'AN-993', type: 'Water', desc: 'Pressure drop in Zone 3 pipelines', probability: '67%', time: 'Tomorrow', severity: 'Low' },
  { id: 'AN-994', type: 'Security', desc: 'Crowd density spike at DB Mall', probability: '88%', time: 'In 45 mins', severity: 'High' },
]

export function PredictiveAIPanel() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Gemini Predictive Core online. I am monitoring 4,204 data streams across Bhopal. How can I assist with forecasting today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "Based on current telemetry, all systems are operating within normal parameters. However, I am detecting a slight anomaly in the upcoming data.";
      
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes('traffic') || lowerInput.includes('congestion')) {
        aiResponse = "Predictive models indicate a 94% probability of severe congestion at Chetak Bridge within 15 minutes due to an unmapped event. I recommend rerouting commercial vehicles via ISBT immediately.";
      } else if (lowerInput.includes('power') || lowerInput.includes('electricity')) {
        aiResponse = "Power grid load will peak at 08:00. Arera Colony is at 82% risk of a voltage dip. Predictive load balancing has been queued.";
      } else if (lowerInput.includes('status') || lowerInput.includes('report')) {
        aiResponse = "City Status: Traffic flow is currently normal but trending upwards. Power grid is stable. 4 predictive anomalies are active and require attention.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full h-full flex flex-col gap-6 pointer-events-auto overflow-y-auto custom-scrollbar pb-32 p-4"
    >
      {/* HEADER */}
      <GlassPanel className="p-6 border-white/10 bg-slate-950/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-neon-cyan/10 rounded-2xl flex items-center justify-center border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Brain className="text-neon-cyan w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-black text-white tracking-tighter uppercase leading-none">
              PREDICTIVE <span className="text-neon-cyan">AI CORE</span>
            </h1>
            <p className="text-slate-400 font-mono text-[9px] uppercase font-black tracking-[0.2em] mt-2 flex items-center gap-2">
              <Sparkles size={10} className="text-neon-yellow" /> Powered by Gemini
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-500 uppercase">Model Confidence</p>
            <p className="text-xl font-black text-neon-green">98.2%</p>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-500 uppercase">Active Streams</p>
            <p className="text-xl font-black text-white">4,204</p>
          </div>
        </div>
      </GlassPanel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px] flex-1 shrink-0">
        {/* LEFT COLUMN: CHARTS & DATA (2/3) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <GlassPanel className="p-6 border-white/5 rounded-[2rem] bg-slate-950/40 flex-1 flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase flex items-center gap-2">
                <Activity size={14} className="text-neon-cyan" /> Multispectral Risk Forecast
              </h3>
              <div className="flex gap-3 text-[9px] font-mono uppercase tracking-widest">
                <span className="flex items-center gap-1 text-neon-cyan"><div className="w-2 h-2 bg-neon-cyan rounded-full"></div> Total Risk</span>
                <span className="flex items-center gap-1 text-neon-yellow"><div className="w-2 h-2 bg-neon-yellow rounded-full"></div> Traffic</span>
                <span className="flex items-center gap-1 text-neon-purple"><div className="w-2 h-2 bg-neon-purple rounded-full"></div> Power</span>
              </div>
            </div>
            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={FORECAST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7551ff" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7551ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#02040a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="risk" stroke="#00f5ff" strokeWidth={2} fill="url(#colorRisk)" />
                  <Area type="monotone" dataKey="traffic" stroke="#fbbf24" strokeWidth={2} fill="url(#colorTraffic)" />
                  <Area type="monotone" dataKey="power" stroke="#7551ff" strokeWidth={2} fill="url(#colorPower)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 border-white/5 rounded-[2rem] bg-slate-950/40 flex-1 flex flex-col min-h-[300px]">
            <h3 className="font-display font-bold tracking-widest text-[10px] text-slate-200 uppercase mb-4 flex items-center gap-2 shrink-0">
              <ShieldAlert size={14} className="text-neon-red" /> Detected Anomalies
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {ANOMALIES.map(anomaly => (
                <div key={anomaly.id} className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                  <div className={`w-1 h-10 rounded-full ${
                    anomaly.severity === 'High' ? 'bg-neon-red' : 
                    anomaly.severity === 'Medium' ? 'bg-neon-yellow' : 'bg-neon-cyan'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-black uppercase text-slate-400 bg-white/5 px-2 py-0.5 rounded">{anomaly.type}</span>
                      <span className="text-[9px] font-mono text-slate-500">{anomaly.id}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{anomaly.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-neon-cyan">{anomaly.probability}</p>
                    <p className="text-[10px] font-mono text-slate-500">{anomaly.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* RIGHT COLUMN: CHATBOT (1/3) */}
        <GlassPanel className="p-0 border-white/10 rounded-[2rem] bg-slate-950/60 shadow-2xl col-span-1 flex flex-col overflow-hidden relative min-h-[600px]">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neon-cyan/10 to-transparent pointer-events-none"></div>
          
          <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-black/20 z-10 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                <Bot className="text-neon-cyan w-5 h-5" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-[#02040a]"></div>
            </div>
            <div>
              <h3 className="font-display font-black text-white text-sm uppercase">Gemini Assistant</h3>
              <p className="text-[10px] font-mono text-neon-cyan">Online & Monitoring</p>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4 z-10 bg-black/10">
            {messages.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-neon-purple/20 border border-neon-purple/50' : 'bg-neon-cyan/20 border border-neon-cyan/50'
                }`}>
                  {msg.role === 'user' ? <User size={14} className="text-neon-purple" /> : <Bot size={14} className="text-neon-cyan" />}
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-neon-purple/20 text-white border border-neon-purple/30 rounded-tr-sm' 
                    : 'bg-black/50 text-slate-300 border border-white/10 rounded-tl-sm shadow-lg'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-neon-cyan" />
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 rounded-tl-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-black/40 border-t border-white/10 z-10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gemini about city operations..." 
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all font-mono"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2 bg-neon-cyan/20 hover:bg-neon-cyan/40 text-neon-cyan rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </GlassPanel>
      </div>
    </motion.div>
  );
}
