import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Brain, 
  Cpu, 
  CloudSun, 
  Truck, 
  Zap,
  Car,
  Activity,
  Terminal,
  ChevronRight,
  Database,
  BarChart3,
  Network
} from 'lucide-react'
import { useCityStore } from '../../store/cityStore'

const navItems = [
  { id: 'command-center', label: 'Command Center', icon: LayoutDashboard, category: 'Main' },
  { id: 'predictive-ai', label: 'Predictive AI', icon: Brain, category: 'Intelligence' },
  { id: 'asset-grid', label: 'Asset Grid', icon: Cpu, category: 'Intelligence' },
  { id: 'environmental', label: 'Environmental', icon: CloudSun, category: 'Analysis' },
  { id: 'weather', label: 'Atmosphere AI', icon: Zap, category: 'Analysis' },
  { id: 'logistics', label: 'Logistics', icon: Truck, category: 'Execution' },
  { id: 'parking', label: 'Smart Parking', icon: Car, category: 'Execution' },
]

export function Sidebar() {
  const { activeSection, setSection } = useCityStore()

  return (
    <aside className="w-20 lg:w-64 h-screen bg-slate-950 border-r border-white/5 flex flex-col z-50 transition-all duration-500 relative group overflow-hidden">
      
      {/* Sidebar background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/5 to-transparent pointer-events-none"></div>
      
      {/* Brand Logo Section */}
      <div className="p-8 pb-10 flex flex-col items-center lg:items-start relative z-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.1)]">
            <Activity className="text-neon-cyan w-5 h-5" />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-display font-black text-sm tracking-[0.2em] text-white uppercase">System Core</h2>
            <p className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest mt-0.5">Level 04 :: Bhopal</p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 space-y-8 relative z-10">
        
        {/* Render grouped items */}
        {['Main', 'Intelligence', 'Analysis', 'Execution'].map(category => (
          <div key={category}>
            <p className="hidden lg:block text-[8px] font-mono text-slate-600 uppercase font-black tracking-[0.3em] mb-4 ml-4">{category}</p>
            <div className="space-y-1.5">
              {navItems.filter(item => item.category === category).map(item => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group/btn
                    ${activeSection === item.id 
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.05)]' 
                      : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'}
                  `}
                >
                  <item.icon size={18} className={`transition-transform duration-300 ${activeSection === item.id ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                  <span className="hidden lg:block font-display font-black text-[11px] uppercase tracking-widest">{item.label}</span>
                  
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeSide"
                      className="absolute left-[-1rem] top-1/4 h-1/2 w-1.5 bg-neon-cyan rounded-r-full shadow-[0_0_15px_#00f5ff]"
                    />
                  )}
                  
                  <div className={`hidden lg:block absolute right-4 opacity-0 group-hover/btn:opacity-100 transition-opacity ${activeSection === item.id ? 'opacity-100' : ''}`}>
                    <ChevronRight size={12} className={activeSection === item.id ? 'text-neon-cyan' : 'text-slate-700'} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 mt-auto relative z-10">
        <button className="w-full bg-slate-900/60 border border-white/5 hover:border-neon-cyan/40 transition-all rounded-2xl p-4 group/action">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-neon-cyan/10 rounded-lg group-hover/action:bg-neon-cyan/20 transition-colors">
                <Database size={16} className="text-neon-cyan" />
             </div>
             <div className="hidden lg:block text-left">
                <p className="text-[9px] font-black text-white uppercase tracking-widest">Deploy Response</p>
                <p className="text-[7px] font-mono text-slate-500 uppercase font-bold mt-0.5">Quick Actions Enabled</p>
             </div>
          </div>
        </button>

        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
           {[
             { label: 'Support Core', icon: Network },
             { label: 'Diagnostics', icon: BarChart3 }
           ].map((action, i) => (
             <button key={i} className="w-full flex items-center gap-4 px-4 text-slate-600 hover:text-white transition-colors group/sub">
                <action.icon size={14} />
                <span className="hidden lg:block text-[9px] font-black uppercase tracking-widest">{action.label}</span>
             </button>
           ))}
        </div>
      </div>

    </aside>
  )
}
