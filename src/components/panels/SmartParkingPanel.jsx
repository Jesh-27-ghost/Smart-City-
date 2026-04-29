import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { 
  Car, CheckCircle2, Clock, Map as MapIcon, Maximize, Settings, Terminal, 
  Activity, AlertTriangle, BarChart3, LayoutDashboard, Calendar, CreditCard, 
  Users, FileText, LogOut, Search, Bell, ChevronRight, Plus, X, QrCode, Menu,
  MapPin, Navigation, ChevronDown, UserPlus, MoreHorizontal, Shield, Mail,
  Download, Printer, DollarSign, Wallet, Edit3, MessageSquare, ThumbsUp, Star,
  AlertCircle, Send, TrendingUp, Zap, Info, RefreshCcw, ArrowUpRight, Target, Radar, Hexagon, MoveUpRight, ChevronUp
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { useCityStore } from '../../store/cityStore'

// --- MOCK DATA ---
const INITIAL_SLOTS = Array.from({ length: 150 }, (_, i) => ({
  id: `${String.fromCharCode(65 + Math.floor(i / 30))}-${String(i % 30 + 1).padStart(2, '0')}`,
  status: Math.random() > 0.4 ? 'available' : (Math.random() > 0.6 ? 'occupied' : 'reserved'),
}));

const RECENT_RESERVATIONS = [
  { id: 1, vehicle: 'MP04-BH-1234', slot: 'B-12', date: '29 Apr 2026', time: '10:00 AM - 12:00 PM', status: 'Confirmed' },
  { id: 2, vehicle: 'MH01-AX-5678', slot: 'A-08', date: '29 Apr 2026', time: '1:00 PM - 3:00 PM', status: 'Confirmed' },
  { id: 3, vehicle: 'DL01-CP-9012', slot: 'C-15', date: '29 Apr 2026', time: '4:00 PM - 6:00 PM', status: 'Pending' },
];

const PAYMENTS_HISTORY = [
  { id: 'TRX-9821', vehicle: 'MP04-BH-1234', slot: 'B-12', amount: 50, method: 'UPI (PhonePe)', date: '29 Apr 2026', time: '11:30 AM', status: 'Success' },
  { id: 'TRX-9822', vehicle: 'MH01-AX-5678', slot: 'A-05', amount: 125, method: 'UPI (GPay)', date: '29 Apr 2026', time: '02:15 PM', status: 'Success' },
  { id: 'TRX-9823', vehicle: 'DL01-CP-9012', slot: 'C-08', amount: 1075, method: 'Credit Card', date: '28 Apr 2026', time: '09:45 AM', status: 'Fine Paid' },
];

const INITIAL_USERS = [
  { id: 1, name: 'Tanay Techy', email: 'tanay@nexuspark.com', role: 'Super Admin', joined: '12 Jan 2024', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Tanay+Techy&background=4318FF&color=fff' },
  { id: 2, name: 'Rahul Sharma', email: 'rahul@gmail.com', role: 'Operator', joined: '05 Feb 2024', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=05CD99&color=fff' },
  { id: 3, name: 'Priya Singh', email: 'priya@yahoo.com', role: 'User', joined: '18 Feb 2024', status: 'Inactive', avatar: 'https://ui-avatars.com/api/?name=Priya+Singh&background=FFB547&color=fff' },
];

const WORKER_FEEDBACK = [
  { id: 1, worker: 'Rajesh Kumar', rating: 4.8, feedback: 'Extremely polite and guided me to my slot even in heavy rain.', user: 'Amit S.', date: '29 Apr 2026' },
  { id: 2, worker: 'Suresh Mani', rating: 2.5, feedback: 'A bit unprofessional. Was on phone when I needed help.', user: 'Priya V.', date: '28 Apr 2026' },
];

const CUSTOMER_COMPLAINTS = [
  { id: 'CMP-101', type: 'Payment Issue', desc: 'Deducted twice from my bank account. Please refund extra ₹25.', status: 'Pending', user: 'Rahul K.', date: '29 Apr 2026' },
  { id: 'CMP-102', type: 'Technical', desc: 'Live map showed slot B-12 as occupied but it was empty.', status: 'Resolved', user: 'Sneha R.', date: '28 Apr 2026' },
];

const RECENT_ACTIVITY = [
  { id: 'ACT-001', vehicle: 'MH-01-AX-1234', inTime: '10:05 AM', expiryTime: Date.now() + 600000, duration: '2h', slot: 'A-01' },
  { id: 'ACT-002', vehicle: 'DL-04-CP-5678', inTime: '09:45 AM', expiryTime: Date.now() + 1200000, duration: '3h', slot: 'B-12' },
];

const INDIA_PARKING_DATA = {
  'Madhya Pradesh': {
    'Bhopal': [
      { name: 'DB Mall Arera Hills', distance: '0.6 km', available: 35, total: 150 },
      { name: 'MP Nagar Zone-1 Multi-level', distance: '1.2 km', available: 10, total: 40 },
      { name: 'Habibganj Station (RKMP)', distance: '4.2 km', available: 50, total: 250 },
      { name: 'New Market Multilevel', distance: '3.2 km', available: 80, total: 300 },
    ],
    'Indore': [
      { name: 'TI Mall MG Road', distance: '2.1 km', available: 85, total: 300 },
      { name: 'Vijay Nagar C21 Square', distance: '3.8 km', available: 120, total: 400 },
    ]
  },
  'Maharashtra': {
    'Mumbai': [
      { name: 'Gateway of India Parking', distance: '0.5 km', available: 12, total: 50 },
      { name: 'Phoenix Marketcity Kurla', distance: '5.2 km', available: 156, total: 500 },
    ]
  }
};

const SYSTEM_LOGS = [
  "[SYSTEM] SCANNING SECTOR ALPHA...",
  "[OCR] PLATE RECOGNIZED: MH-01-AX-1234",
  "[SENSOR] SLOT B-12 OCCUPIED",
  "[AI] OPTIMIZING TRAFFIC FLOW - GATE 4",
  "[NETWORK] LINK STABLE :: BH-PK-01",
  "[SECURITY] PERIMETER SECURE",
  "[NODE] DATA SYNC COMPLETED IN 12ms",
];

const COLORS = ['#00f5ff', '#10b981', '#7551ff', '#fbbf24', '#ef4444'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
}

export function SmartParkingPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedState, setSelectedState] = useState('Madhya Pradesh');
  const [selectedCity, setSelectedCity] = useState('Bhopal');
  const [selectedParking, setSelectedParking] = useState(null); // Initialize null as per original logic
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [reservations, setReservations] = useState(RECENT_RESERVATIONS);
  const [payments, setPayments] = useState(PAYMENTS_HISTORY);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [feedbacks, setFeedbacks] = useState(WORKER_FEEDBACK);
  const [complaints, setComplaints] = useState(CUSTOMER_COMPLAINTS);
  const [isLockdown, setIsLockdown] = useState(false);
  const [mapTilt, setMapTilt] = useState(30);
  const [mapRotation, setMapRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState('details'); // 'details' or 'payment'
  const [newBooking, setNewBooking] = useState({ vehicle: '', slot: '', duration: '1 Hour', price: 25 });
  
  const { userRole } = useCityStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 600);
    const logTimer = setInterval(() => {
      setLogIndex(prev => (prev + 1) % SYSTEM_LOGS.length);
      setLogs(l => [SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)], ...l].slice(0, 10));
    }, 3000);
    return () => { clearTimeout(timer); clearInterval(logTimer); };
  }, []);

  const stats = useMemo(() => {
    const available = slots.filter(s => s.status === 'available').length;
    const occupied = slots.filter(s => s.status === 'occupied').length;
    const reserved = slots.filter(s => s.status === 'reserved').length;
    return { total: slots.length, available, occupied, reserved };
  }, [slots]);

  const pieData = [
    { name: 'Available', value: stats.available, color: '#10b981' },
    { name: 'Occupied', value: stats.occupied, color: '#ef4444' },
    { name: 'Reserved', value: stats.reserved, color: '#fbbf24' }
  ];

  const handleSelectParking = (park) => {
    setSelectedParking(park);
    // Simulate slot generation for the specific parking lot
    const newSlots = Array.from({ length: park.total }, (_, i) => ({
      id: `${String.fromCharCode(65 + Math.floor(i / (park.total/5)) || 65)}-${String(i % (park.total/5) + 1).padStart(2, '0')}`,
      status: Math.random() > 0.4 ? 'available' : (Math.random() > 0.7 ? 'occupied' : 'reserved'),
    }));
    setSlots(newSlots);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full flex flex-col gap-6 pointer-events-auto overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar pb-32 p-4"
    >
      {/* HEADER WITH TABS */}
      <motion.div variants={itemVariants} className="relative overflow-hidden p-6 rounded-[1.5rem] border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-xl flex flex-col gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 bg-neon-cyan/10 rounded-2xl flex items-center justify-center border border-neon-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.1)]">
              <Car className="text-neon-cyan w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-black text-white tracking-tighter uppercase leading-none">
                SMART <span className="text-neon-cyan">PARKING</span>
              </h1>
              <p className="text-slate-500 font-mono text-[8px] uppercase font-black tracking-[0.2em] mt-2">Nexus Hub :: BH-PK-01 :: {userRole.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
             {[
               { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'user'] },
               { id: 'slots', label: 'Live Map', icon: MapIcon, roles: ['admin', 'user'] },
               { id: 'reservations', label: 'Reservations', icon: Calendar, roles: ['admin', 'user'] },
               { id: 'payments', label: 'Payments', icon: CreditCard, roles: ['admin'] },
               { id: 'reports', label: 'Reports', icon: FileText, roles: ['admin'] },
               { id: 'revenue', label: 'Revenue', icon: BarChart3, roles: ['admin'] },
               { id: 'users', label: 'Users', icon: Users, roles: ['admin'] }
             ].filter(tab => tab.roles.includes(userRole)).map((tab) => (
               <button 
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSection === tab.id ? 'bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,245,255,0.4)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
               >
                 <tab.icon size={12} />
                 <span className="hidden sm:inline">{tab.label}</span>
               </button>
             ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeSection === 'dashboard' && (
          <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8">
            
            {userRole === 'user' && (
              <GlassPanel className="p-8 border-neon-cyan/20 rounded-[2rem] bg-gradient-to-r from-neon-cyan/10 to-transparent flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-neon-cyan rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-black text-white tracking-widest uppercase">Quick Book</h2>
                    <p className="text-slate-400 text-sm mt-1">Need a spot? Find and reserve the best parking in seconds.</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveSection('reservations'); setIsBookingModalOpen(true); }}
                  className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl"
                >
                  Book Now
                </button>
              </GlassPanel>
            )}

            {!selectedParking ? (
              <GlassPanel className="p-16 border-white/5 rounded-[2.5rem] bg-slate-950/40 flex flex-col items-center justify-center text-center gap-6 shadow-2xl">
                 <div className="w-20 h-20 bg-neon-cyan/10 rounded-3xl flex items-center justify-center text-neon-cyan animate-bounce">
                    <MapPin size={40} />
                 </div>
                 <div>
                    <h2 className="text-2xl font-display font-black text-white tracking-widest uppercase">Select a Parking Lot</h2>
                    <p className="text-slate-500 font-medium max-w-md mt-4 text-sm">Please choose a state, city and specific parking location from the explorer below to initialize the nexus hub.</p>
                 </div>
              </GlassPanel>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Capacity", val: stats.total, icon: LayoutDashboard, color: "text-white" },
                  { label: "Available Now", val: stats.available, icon: CheckCircle2, color: "text-neon-green" },
                  { label: "Occupied Slots", val: stats.occupied, icon: Car, color: "text-neon-red" },
                  { label: "Reserved Hub", val: stats.reserved, icon: Calendar, color: "text-neon-yellow" }
                ].map((s, i) => (
                  <GlassPanel key={i} className="p-6 border-white/5 rounded-3xl bg-slate-950/40 hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20">
                        <s.icon size={18} className={s.color} />
                      </div>
                      <ArrowUpRight size={14} className="text-slate-700 group-hover:text-neon-cyan transition-colors" />
                    </div>
                    <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                    <h4 className="text-3xl font-display font-black text-white">{s.val}</h4>
                  </GlassPanel>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
               {/* EXPLORE PARKING LOTS */}
               <div className="xl:col-span-8 flex flex-col gap-8">
                  <GlassPanel className="p-0 border-white/5 rounded-[2rem] shadow-2xl overflow-hidden bg-slate-950/40">
                    <div className="bg-white/5 px-8 py-6 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/30">
                          <Search className="text-neon-cyan w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-display font-black text-white tracking-widest uppercase">Explore Parking Lots</h3>
                          <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">Regional Database :: Syncing</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="relative group">
                          <select 
                            value={selectedState} 
                            onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(Object.keys(INDIA_PARKING_DATA[e.target.value])[0]); setSelectedParking(null); }}
                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-white uppercase outline-none focus:border-neon-cyan/50 appearance-none pr-10 cursor-pointer"
                          >
                            {Object.keys(INDIA_PARKING_DATA).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                        <div className="relative group">
                          <select 
                            value={selectedCity} 
                            onChange={(e) => { setSelectedCity(e.target.value); setSelectedParking(null); }}
                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-white uppercase outline-none focus:border-neon-cyan/50 appearance-none pr-10 cursor-pointer"
                          >
                            {Object.keys(INDIA_PARKING_DATA[selectedState]).map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 max-h-[480px] overflow-y-auto custom-scrollbar flex flex-col gap-4">
                      {INDIA_PARKING_DATA[selectedState][selectedCity].map((park, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ scale: 1.01, x: 5 }}
                          onClick={() => handleSelectParking(park)}
                          className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${selectedParking?.name === park.name ? 'bg-neon-cyan/10 border-neon-cyan/40 shadow-2xl shadow-neon-cyan/5' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedParking?.name === park.name ? 'bg-neon-cyan text-black' : 'bg-white/5 border-white/10 text-neon-cyan'}`}>
                              <MapPin size={20} />
                            </div>
                            <div>
                              <h4 className="font-display font-black text-white text-sm tracking-wide uppercase">{park.name}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">{park.distance} AWAY</span>
                                <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                                <span className="text-[9px] font-mono font-black text-neon-cyan uppercase tracking-widest">{park.total} TOTAL SLOTS</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-[8px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1">AVAILABILITY</p>
                              <p className={`text-sm font-black ${park.available > 50 ? 'text-neon-green' : 'text-neon-yellow'}`}>{park.available} FREE</p>
                            </div>
                            <ChevronRight size={16} className={selectedParking?.name === park.name ? 'text-neon-cyan' : 'text-slate-700'} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </GlassPanel>
               </div>

               {/* EFFICIENCY MATRIX */}
               <div className="xl:col-span-4 flex flex-col gap-8">
                  <GlassPanel className="p-8 rounded-[2.5rem] bg-slate-950/40 border-white/5 shadow-2xl flex flex-col items-center">
                    <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-10 w-full text-center">Efficiency Matrix</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                            {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-display font-black text-white">{selectedParking ? Math.round((stats.available / stats.total) * 100) : 0}%</span>
                        <span className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest">Available</span>
                      </div>
                    </div>
                    <div className="w-full space-y-4">
                      {pieData.map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.name}</span>
                          </div>
                          <span className="text-xs font-black text-white">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </GlassPanel>
               </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'slots' && (
          <motion.div key="slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-250px)] flex gap-6 overflow-hidden">
            {selectedParking ? (
              <>
                <div className="flex-[2] bg-slate-950/60 rounded-[2.5rem] border border-white/10 flex flex-col relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>
                  
                  <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl border transition-all ${isLockdown ? 'bg-neon-red/10 border-neon-red/30' : 'bg-neon-cyan/10 border-neon-cyan/30'}`}>
                        <Radar className={`w-5 h-5 ${isLockdown ? 'text-neon-red animate-pulse' : 'text-neon-cyan'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-display font-black text-white tracking-widest uppercase">{selectedParking.name} :: SECTOR MAP</h3>
                        <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">Active Monitoring Protocol :: BH-PK-01</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 bg-black/40 px-6 py-2 rounded-2xl border border-white/10">
                       <div className="flex flex-col gap-1">
                          <span className="text-[7px] font-mono font-black text-slate-500 uppercase tracking-widest">Tilt ({mapTilt}°)</span>
                          <input type="range" min="0" max="75" value={mapTilt} onChange={(e) => setMapTilt(parseInt(e.target.value))} className="w-24 h-1 bg-white/10 rounded-full appearance-none accent-neon-cyan" />
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-[7px] font-mono font-black text-slate-500 uppercase tracking-widest">Rotation ({mapRotation}°)</span>
                          <input type="range" min="-180" max="180" value={mapRotation} onChange={(e) => setMapRotation(parseInt(e.target.value))} className="w-24 h-1 bg-white/10 rounded-full appearance-none accent-neon-cyan" />
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 relative overflow-auto custom-scrollbar flex items-center justify-center p-20 bg-[#05080f]">
                    <div 
                      className="grid transition-transform duration-700 ease-out p-10 origin-center"
                      style={{
                        transform: `perspective(3000px) rotateX(${mapTilt}deg) rotateZ(${mapRotation}deg) scale(0.9)`,
                        transformStyle: 'preserve-3d',
                        gap: '1rem',
                        gridTemplateColumns: 'repeat(10, minmax(0, 1fr))'
                      }}
                    >
                      {slots.slice(0, 100).map((s) => (
                        <motion.div 
                          key={s.id}
                          layout
                          animate={{ translateZ: (s.status === 'occupied' || isLockdown) ? 15 : 0 }}
                          className={`w-14 h-20 rounded-lg border-2 flex items-center justify-center font-mono relative transition-all duration-700 shadow-2xl
                            ${s.status === 'available' && !isLockdown ? 'bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan/40 hover:bg-neon-cyan/10 hover:border-neon-cyan/40 hover:text-neon-cyan' : ''}
                            ${s.status === 'reserved' ? 'bg-neon-yellow/10 border-neon-yellow/30 text-neon-yellow/60' : ''}
                            ${(s.status === 'occupied' || isLockdown) ? 'bg-neon-red/20 border-neon-red/40 text-neon-red shadow-[0_0_20px_rgba(255,46,46,0.2)]' : ''}
                          `}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                           <div className="flex flex-col items-center gap-1">
                             <span className="text-[9px] font-black">{s.id}</span>
                             {(s.status === 'occupied' || isLockdown) ? <Car size={18} /> : s.status === 'reserved' ? <Clock size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40"></div>}
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-96 flex flex-col gap-6">
                   <GlassPanel className="flex-1 p-8 rounded-[2rem] bg-slate-950/60 border-white/10 flex flex-col shadow-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <Terminal className="text-neon-cyan w-5 h-5" />
                        <h3 className="text-xs font-display font-black text-white uppercase tracking-widest">Tactical OCR Stream</h3>
                      </div>
                      <div className="flex-1 bg-black/60 rounded-2xl border border-white/5 p-5 font-mono text-[10px] overflow-hidden">
                         <div className="space-y-2">
                            {logs.map((l, i) => <p key={i} className="opacity-80 flex gap-2"><span className="text-slate-600">[{i}]</span> {l}</p>)}
                         </div>
                      </div>
                   </GlassPanel>
                   {userRole === 'admin' && (
                     <button onClick={() => setIsLockdown(!isLockdown)} className={`w-full p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4 ${isLockdown ? 'bg-neon-red/20 border-neon-red text-neon-red animate-pulse' : 'bg-slate-950/60 border-white/10 text-slate-500 hover:text-white'}`}>
                        <AlertTriangle size={32} />
                        <span className="text-xs font-black uppercase tracking-widest">{isLockdown ? 'RELEASE LOCKDOWN' : 'INITIATE LOCKDOWN'}</span>
                     </button>
                   )}
                </div>
              </>
            ) : (
              <div className="w-full flex items-center justify-center">
                 <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Please select a parking lot first</p>
              </div>
            )}
          </motion.div>
        )}

        {activeSection === 'reservations' && (
          <motion.div key="res" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-display font-black text-white tracking-widest uppercase">Reservations System</h2>
               <button 
                onClick={() => { setBookingStep('details'); setIsBookingModalOpen(true); }}
                className="px-6 py-3 bg-neon-cyan text-black font-black rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)]"
               >
                  <Plus size={18} /> NEW BOOKING
               </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
               {/* PRICING CARD */}
               <div className="xl:col-span-4">
                  <GlassPanel className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600/80 to-purple-700/80 border-white/20 shadow-2xl h-full flex flex-col justify-between">
                     <div>
                        <h3 className="text-2xl font-display font-black text-white uppercase tracking-widest mb-8">Standard Pricing</h3>
                        <div className="space-y-6">
                           <div className="flex justify-between items-center pb-4 border-b border-white/10">
                              <span className="text-sm font-black text-white/70 uppercase">Hourly Rate</span>
                              <span className="text-2xl font-black text-white">₹25/hr</span>
                           </div>
                           <div className="flex justify-between items-center pb-4 border-b border-white/10">
                              <span className="text-sm font-black text-white/70 uppercase">Pre-Booking Fee</span>
                              <span className="text-sm font-black text-white">Varies by time</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm font-black text-white/70 uppercase">Grace Period</span>
                              <span className="bg-white/20 px-6 py-2 rounded-full text-xs font-black text-white">30 Mins</span>
                           </div>
                        </div>
                     </div>
                     <p className="text-[9px] font-mono text-white/50 uppercase tracking-[0.3em] mt-10">© 2026 Smart Parking System</p>
                  </GlassPanel>
               </div>

               {/* ALLOCATE SLOT GRID */}
               <div className="xl:col-span-8">
                  <GlassPanel className="p-8 rounded-[2rem] bg-slate-950/40 border-white/5 shadow-2xl">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="text-lg font-display font-black text-white uppercase tracking-widest">Allocate Slot</h3>
                           <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest mt-1">{selectedParking?.name || 'Bhopal Central'}</p>
                        </div>
                        <div className="flex gap-2">
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neon-cyan"></div><span className="text-[8px] font-black text-slate-400 uppercase">FREE</span></div>
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neon-red"></div><span className="text-[8px] font-black text-slate-400 uppercase">BUSY</span></div>
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neon-yellow"></div><span className="text-[8px] font-black text-slate-400 uppercase">RSVD</span></div>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
                        {slots.slice(0, 40).map((s) => (
                           <div 
                              key={s.id}
                              className={`aspect-[3/4] rounded-lg border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105
                                 ${s.status === 'available' ? 'bg-neon-cyan/5 border-neon-cyan/20' : ''}
                                 ${s.status === 'occupied' ? 'bg-neon-red/10 border-neon-red/20 opacity-40' : ''}
                                 ${s.status === 'reserved' ? 'bg-neon-yellow/10 border-neon-yellow/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]' : ''}
                              `}
                           >
                              <Car size={10} className={s.status === 'available' ? 'text-neon-cyan' : s.status === 'occupied' ? 'text-neon-red' : 'text-neon-yellow'} />
                              <span className="text-[7px] font-black text-white/60">{s.id}</span>
                              {s.status === 'reserved' && <span className="text-[5px] font-black text-neon-yellow uppercase">RSVD</span>}
                           </div>
                        ))}
                     </div>
                  </GlassPanel>
               </div>
            </div>

            <div className="mt-8">
               <h3 className="text-sm font-display font-black text-white uppercase tracking-widest mb-6 ml-1">Recent Activity</h3>
               <GlassPanel className="p-0 rounded-[2rem] border-white/5 bg-slate-950/40 overflow-hidden shadow-2xl">
               <table className="w-full text-left">
                  <thead className="bg-white/5">
                     <tr className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                        <th className="px-8 py-5">Vehicle</th>
                        <th className="px-8 py-5">Slot</th>
                        <th className="px-8 py-5">Time Slot</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {reservations.map((res) => (
                       <tr key={res.id} className="hover:bg-white/5 transition-all">
                          <td className="px-8 py-6 font-black text-white text-sm">{res.vehicle}</td>
                          <td className="px-8 py-6 text-neon-cyan font-black text-xs">SLOT {res.slot}</td>
                          <td className="px-8 py-6 text-slate-400 text-xs font-medium">{res.time}</td>
                          <td className="px-8 py-6">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${res.status === 'Confirmed' ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' : 'bg-neon-yellow/10 text-neon-yellow border border-neon-yellow/20'}`}>
                                {res.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="p-2 text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={18}/></button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </GlassPanel>
            </div>
          </motion.div>
        )}

        {activeSection === 'payments' && (
          <motion.div key="pay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-display font-black text-white tracking-widest uppercase">Financial Hub</h2>
               <div className="flex gap-4">
                  <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all"><Printer size={18}/></button>
                  <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all"><Download size={18}/></button>
               </div>
            </div>
            <GlassPanel className="p-0 rounded-[2rem] border-white/5 bg-slate-950/40 overflow-hidden shadow-2xl">
               <table className="w-full text-left">
                  <thead className="bg-white/5">
                     <tr className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                        <th className="px-8 py-5">Transaction ID</th>
                        <th className="px-8 py-5">Vehicle</th>
                        <th className="px-8 py-5">Amount</th>
                        <th className="px-8 py-5">Method</th>
                        <th className="px-8 py-5">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {payments.map((p) => (
                       <tr key={p.id} className="hover:bg-white/5 transition-all">
                          <td className="px-8 py-6 font-mono font-bold text-neon-cyan text-xs">{p.id}</td>
                          <td className="px-8 py-6 font-black text-white text-sm">{p.vehicle}</td>
                          <td className="px-8 py-6 text-white font-black text-sm">₹{p.amount}.00</td>
                          <td className="px-8 py-6 text-slate-400 text-xs font-medium uppercase tracking-widest">{p.method}</td>
                          <td className="px-8 py-6">
                             <span className="bg-neon-green/10 text-neon-green px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-neon-green/20">{p.status}</span>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </GlassPanel>
          </motion.div>
        )}

        {activeSection === 'reports' && (
          <motion.div key="rep" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WORKER FEEDBACK */}
            <GlassPanel className="p-8 rounded-[2rem] bg-slate-950/40 border-white/10 flex flex-col gap-6 shadow-2xl">
               <h3 className="text-lg font-display font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <ThumbsUp size={20} className="text-neon-cyan" /> Worker Performance
               </h3>
               <div className="space-y-4">
                  {feedbacks.map((f) => (
                    <div key={f.id} className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-3">
                       <div className="flex justify-between items-center">
                          <h4 className="font-black text-white text-sm">{f.worker}</h4>
                          <div className="flex items-center gap-1"><Star size={12} className="text-neon-yellow fill-neon-yellow"/><span className="text-xs font-black text-neon-yellow">{f.rating}</span></div>
                       </div>
                       <p className="text-xs text-slate-400 italic font-medium leading-relaxed">"{f.feedback}"</p>
                    </div>
                  ))}
               </div>
            </GlassPanel>

            {/* CUSTOMER COMPLAINTS */}
            <GlassPanel className="p-8 rounded-[2rem] bg-slate-950/40 border-white/10 flex flex-col gap-6 shadow-2xl">
               <h3 className="text-lg font-display font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <AlertCircle size={20} className="text-neon-red" /> Active Complaints
               </h3>
               <div className="space-y-4">
                  {complaints.map((c) => (
                    <div key={c.id} className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-2">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-black text-neon-red uppercase tracking-widest">{c.type}</span>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${c.status === 'Resolved' ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-red/10 text-neon-red'}`}>{c.status}</span>
                       </div>
                       <p className="text-xs text-slate-300 font-medium leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
               </div>
            </GlassPanel>
          </motion.div>
        )}

        {activeSection === 'revenue' && (
          <motion.div key="rev" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Today's Revenue", val: "₹1,250", icon: DollarSign, color: "text-neon-green" },
                  { label: "Avg Ticket Size", val: "₹45", icon: BarChart3, color: "text-neon-cyan" },
                  { label: "Growth Index", val: "+12.4%", icon: TrendingUp, color: "text-neon-purple" }
                ].map((s, i) => (
                  <GlassPanel key={i} className="p-8 border-white/5 rounded-3xl bg-slate-950/40 flex items-center justify-between">
                     <div>
                        <p className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                        <h4 className="text-3xl font-display font-black text-white">{s.val}</h4>
                     </div>
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <s.icon size={24} className={s.color} />
                     </div>
                  </GlassPanel>
                ))}
             </div>
             <GlassPanel className="p-10 rounded-[2.5rem] bg-slate-950/40 border-white/5 shadow-2xl">
                <h3 className="text-lg font-display font-black text-white uppercase tracking-widest mb-10">Financial Performance Analytics</h3>
                <div className="h-96 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Mon', revenue: 4500 }, { name: 'Tue', revenue: 5200 }, { name: 'Wed', revenue: 4800 },
                        { name: 'Thu', revenue: 6100 }, { name: 'Fri', revenue: 7500 }, { name: 'Sat', revenue: 8900 }, { name: 'Sun', revenue: 7200 }
                      ]}>
                         <defs>
                           <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} dy={10} />
                         <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                         <Tooltip contentStyle={{backgroundColor: '#0a0a0f', border: '1px solid #1e293b', borderRadius: '16px'}} />
                         <Area type="monotone" dataKey="revenue" stroke="#00f5ff" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </GlassPanel>
          </motion.div>
        )}

        {activeSection === 'users' && (
          <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-display font-black text-white tracking-widest uppercase">System Users</h2>
               <button className="px-6 py-3 bg-neon-cyan text-black font-black rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
                  <UserPlus size={18} /> ADD USER
               </button>
            </div>
            <GlassPanel className="p-0 rounded-[2rem] border-white/5 bg-slate-950/40 overflow-hidden shadow-2xl">
               <table className="w-full text-left">
                  <thead className="bg-white/5">
                     <tr className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                        <th className="px-8 py-5">Identity</th>
                        <th className="px-8 py-5">System Role</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Joined</th>
                        <th className="px-8 py-5 text-right">Access</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {users.map((u) => (
                       <tr key={u.id} className="hover:bg-white/5 transition-all">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border-2 border-neon-cyan/20 overflow-hidden">
                                   <img src={u.avatar} alt={u.name} />
                                </div>
                                <div><p className="font-black text-white text-sm">{u.name}</p><p className="text-[10px] text-slate-500 font-medium">{u.email}</p></div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2 text-slate-300 font-black text-[10px] uppercase tracking-widest">
                                <Shield size={12} className="text-neon-cyan" /> {u.role}
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${u.status === 'Active' ? 'bg-neon-green/10 text-neon-green' : 'bg-slate-800 text-slate-500'}`}>
                                {u.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-slate-400 text-xs font-medium">{u.joined}</td>
                          <td className="px-8 py-6 text-right">
                             <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-500 hover:text-neon-cyan transition-colors"><Edit3 size={16}/></button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                   <h3 className="text-2xl font-display font-black text-white tracking-widest uppercase">{bookingStep === 'details' ? 'Book Your Space' : 'Secure Checkout'}</h3>
                   <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest mt-1">
                      {bookingStep === 'details' ? 'Secure your parking space in seconds' : 'Scan QR to pay ₹25.00 via UPI'}
                   </p>
                </div>
                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {bookingStep === 'details' ? (
                <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Number</label>
                      <input 
                        type="text" 
                        placeholder="MH-01-AX-1234"
                        value={newBooking.vehicle}
                        onChange={(e) => setNewBooking({...newBooking, vehicle: e.target.value})}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 text-white font-black placeholder:text-slate-700 outline-none focus:border-neon-cyan/50 transition-colors shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1">Slot ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g. A-05"
                        value={newBooking.slot}
                        onChange={(e) => setNewBooking({...newBooking, slot: e.target.value})}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 text-white font-black placeholder:text-slate-700 outline-none focus:border-neon-cyan/50 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                       <CheckCircle2 size={12} className="text-neon-cyan" />
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recommended Empty Slots</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                       {['A-04', 'A-08', 'D-07', 'D-08', 'E-01', 'E-02'].map(s => (
                         <button 
                          key={s} 
                          onClick={() => setNewBooking({...newBooking, slot: s})}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black border transition-all ${newBooking.slot === s ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                         >
                           {s}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1">Check-in Time</label>
                      <div className="relative">
                         <input 
                          type="text" 
                          readOnly
                          value={new Date().toLocaleString()}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 text-white font-black outline-none cursor-default shadow-inner"
                         />
                         <Calendar size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                      <select 
                        value={newBooking.duration}
                        onChange={(e) => setNewBooking({...newBooking, duration: e.target.value})}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 text-white font-black outline-none focus:border-neon-cyan/50 appearance-none shadow-inner"
                      >
                        <option>1 Hour</option>
                        <option>2 Hours</option>
                        <option>4 Hours</option>
                        <option>8 Hours</option>
                      </select>
                    </div>
                  </div>

                  <GlassPanel className="p-6 bg-neon-cyan/5 border-neon-cyan/20 rounded-2xl flex items-center justify-between">
                     <div>
                        <span className="text-3xl font-display font-black text-white">₹{newBooking.price}.00</span>
                        <p className="text-[8px] font-mono text-neon-cyan uppercase font-black tracking-widest mt-1">Total Payable Amount</p>
                     </div>
                     <span className="text-[10px] font-black text-slate-500">Rate: ₹25/hr</span>
                  </GlassPanel>

                  <button 
                    onClick={() => {
                      if (newBooking.vehicle && newBooking.slot) {
                        setBookingStep('payment');
                      }
                    }}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl
                      ${(newBooking.vehicle && newBooking.slot) ? 'bg-neon-cyan text-black hover:scale-[1.02]' : 'bg-white/5 text-slate-600 border border-white/10 cursor-not-allowed'}
                    `}
                  >
                    <CreditCard size={20} />
                    { (newBooking.vehicle && newBooking.slot) ? 'Proceed to Payment' : 'Enter Valid Slot ID' }
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-8 relative z-10 py-4">
                  <div className="p-6 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                     <QrCode size={180} className="text-slate-900" />
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                     <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
                     <p className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-[0.3em]">Verified Payment Gateway</p>
                  </div>

                  <button 
                    onClick={() => {
                      setReservations([{ id: Date.now(), ...newBooking, time: `Today, ${newBooking.duration}`, status: 'Confirmed' }, ...reservations]);
                      setIsBookingModalOpen(false);
                      setNewBooking({ vehicle: '', slot: '', duration: '1 Hour', price: 25 });
                    }}
                    className="w-full py-5 bg-neon-green text-black font-black uppercase tracking-[0.15em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3"
                  >
                    <CheckCircle2 size={20} />
                    Confirm Payment & Finalize Slot
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
