import { create } from 'zustand'

export const TRAFFIC_NODES = [
  { id: "TN-001", name: "MP Nagar Square", lat: 23.2330, lng: 77.4327, type: "junction" },
  { id: "TN-002", name: "Board Office Square", lat: 23.2275, lng: 77.4019, type: "junction" },
  { id: "TN-003", name: "Chetak Bridge", lat: 23.2385, lng: 77.4195, type: "bridge" },
  { id: "TN-004", name: "ISBT Nadra Bus Stand", lat: 23.2641, lng: 77.4093, type: "junction" },
  { id: "TN-005", name: "Bittan Market", lat: 23.2176, lng: 77.4401, type: "junction" },
  { id: "TN-006", name: "Roshanpura Square", lat: 23.2261, lng: 77.4141, type: "junction" },
  { id: "TN-007", name: "DB Mall Crossing", lat: 23.2310, lng: 77.4298, type: "junction" },
  { id: "TN-008", name: "Hamidia Road", lat: 23.2683, lng: 77.4098, type: "road" },
  { id: "TN-009", name: "New Market", lat: 23.2302, lng: 77.4140, type: "junction" },
  { id: "TN-010", name: "Arera Colony Entry", lat: 23.2097, lng: 77.4314, type: "junction" },
  { id: "TN-011", name: "Govindpura Industrial", lat: 23.2729, lng: 77.4664, type: "industrial" },
  { id: "TN-012", name: "Kolar Road Chauraha", lat: 23.1802, lng: 77.4374, type: "junction" },
].map(n => ({
  ...n,
  vehicleCount: Math.floor(Math.random() * 800),
  avgSpeed: Math.floor(Math.random() * 60) + 20,
  congestionIndex: Math.floor(Math.random() * 100),
  signalPhase: ["GREEN", "RED", "YELLOW"][Math.floor(Math.random() * 3)],
  signalTimer: Math.floor(Math.random() * 60),
  status: "clear", // clear, moderate, heavy, blocked, accident
  lastUpdated: Date.now()
}))

export const ROAD_CORRIDORS = [
  { id: "CORR-01", name: "MP Nagar – Board Office", color: "#00f5ff", points: [[23.2330, 77.4327], [23.2305, 77.4240], [23.2275, 77.4019]] },
  { id: "CORR-02", name: "Chetak Bridge – Roshanpura", color: "#00f5ff", points: [[23.2385, 77.4195], [23.2330, 77.4170], [23.2261, 77.4141]] },
  { id: "CORR-03", name: "Hamidia Road Trunk", color: "#00f5ff", points: [[23.2683, 77.4098], [23.2550, 77.4100], [23.2400, 77.4100]] },
  { id: "CORR-04", name: "Kolar Road Spine", color: "#00f5ff", points: [[23.2310, 77.4298], [23.2200, 77.4330], [23.1802, 77.4374]] },
  { id: "CORR-05", name: "Bittan Market Outer Link", color: "#00f5ff", points: [[23.2176, 77.4401], [23.2100, 77.4350], [23.2097, 77.4314]] },
]

export const DIVERSION_ROUTES = [
  { id: "DIV-01", name: "Via VIP Road Bypass", avoidsCorridors: ["CORR-01"], points: [[23.2330, 77.4327], [23.2400, 77.4380], [23.2350, 77.4100], [23.2275, 77.4019]], estimatedDelay: "7 min saved", color: "#ff8c00" },
  { id: "DIV-02", name: "Via Shyamla Hills", avoidsCorridors: ["CORR-02"], points: [[23.2385, 77.4195], [23.2450, 77.4250], [23.2380, 77.4080], [23.2261, 77.4141]], estimatedDelay: "5 min saved", color: "#ff8c00" },
  { id: "DIV-03", name: "Via Arera E-Sector Bypass", avoidsCorridors: ["CORR-05"], points: [[23.2176, 77.4401], [23.2250, 77.4450], [23.2150, 77.4250], [23.2097, 77.4314]], estimatedDelay: "4 min saved", color: "#ff8c00" },
  { id: "DIV-04", name: "Via Nadra Station Link", avoidsCorridors: ["CORR-03"], points: [[23.2683, 77.4098], [23.2750, 77.4150], [23.2500, 77.4200], [23.2400, 77.4100]], estimatedDelay: "6 min saved", color: "#ff8c00" },
]

export const useTrafficStore = create((set, get) => ({
  nodes: TRAFFIC_NODES,
  corridors: ROAD_CORRIDORS,
  activeDiversions: [],
  incidents: [],
  aiLog: [{ id: Date.now().toString(), message: "System initialized. Monitoring active.", type: "info", timestamp: new Date().toLocaleTimeString() }],
  selectedNodeId: null,
  simulationActive: false,
  startNodeId: null,
  endNodeId: null,
  navigationRoute: null,
  cityMetrics: {
    totalVehicles: 4520,
    avgSpeed: 42,
    activeIncidents: 0,
    signalOverrides: 0,
    flowHistory: Array.from({ length: 30 }, (_, i) => ({ time: i.toString(), value: Math.floor(Math.random() * 5000) + 3000 }))
  },
  toasts: [],

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setSimulationActive: (active) => set({ simulationActive: active }),
  setStartNodeId: (id) => set({ startNodeId: id }),
  setEndNodeId: (id) => set({ endNodeId: id }),

  addToast: (message) => {
    const id = Date.now().toString()
    set(state => ({ toasts: [...state.toasts, { id, message }] }))
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
    }, 4000)
  },

  addAILog: (message, type) => {
    set(state => {
      const newLog = { id: Date.now().toString(), message, type, timestamp: new Date().toLocaleTimeString() }
      return { aiLog: [newLog, ...state.aiLog].slice(0, 8) }
    })
  },

  calculateRoute: () => {
    const { startNodeId, endNodeId, nodes } = get()
    if (!startNodeId || !endNodeId) return

    const start = nodes.find(n => n.id === startNodeId)
    const end = nodes.find(n => n.id === endNodeId)
    if (!start || !end) return

    // Simple simulated routing logic: direct path + jitter points
    const midLat = (start.lat + end.lat) / 2
    const midLng = (start.lng + end.lng) / 2
    
    // Check for incidents on direct path (simulated)
    const incidentNode = nodes.find(n => n.status !== 'clear' && 
      Math.abs(n.lat - midLat) < 0.01 && Math.abs(n.lng - midLng) < 0.01)

    let points = [[start.lat, start.lng], [midLat, midLng], [end.lat, end.lng]]
    
    if (incidentNode) {
      get().addAILog(`Incident detected on primary route at ${incidentNode.name}. Recalculating...`, 'warning')
      get().addToast(`🔄 AI Rerouting — Avoiding ${incidentNode.name}`)
      // Reroute via offset mid-point
      points = [[start.lat, start.lng], [midLat + 0.005, midLng + 0.005], [end.lat, end.lng]]
    }

    set({ navigationRoute: { id: 'NAV-01', points, name: `${start.name} to ${end.name}` } })
  },

  injectEvent: (nodeId, eventType, intensity) => {
    const state = get()
    const node = state.nodes.find(n => n.id === nodeId)
    if (!node) return

    let status = "clear"
    let newSpeed = node.avgSpeed
    let newCongestion = node.congestionIndex
    let type = "info"

    if (eventType === "Heavy Congestion") { status = "heavy"; newSpeed = 15; newCongestion = 85; type = "warning" }
    else if (eventType === "Road Blockage") { status = "blocked"; newSpeed = 0; newCongestion = 100; type = "alert" }
    else if (eventType === "Accident") { status = "accident"; newSpeed = 0; newCongestion = 100; type = "alert" }
    else if (eventType === "Signal Failure") { status = "moderate"; newSpeed = 25; newCongestion = 60; type = "warning" }

    get().addAILog(`Anomaly detected at ${node.name} — ${eventType} (Severity: ${intensity})`, type)

    // Handle diversion for all nearby nodes
    let newDiversions = [...state.activeDiversions]
    if (status === "blocked" || status === "accident") {
      // Find all nodes within ~1.5km
      const nearbyNodes = state.nodes.filter(n => {
        const dist = Math.sqrt(Math.pow(n.lat - node.lat, 2) + Math.pow(n.lng - node.lng, 2))
        return dist < 0.015 // roughly 1.5km
      })

      get().addAILog(`Impact zone identified: ${nearbyNodes.length} junctions affected. Generating multi-point bypasses...`, "warning")

      nearbyNodes.forEach(nearby => {
        // Find a unique diversion for each nearby node area
        const diversion = DIVERSION_ROUTES.find(d => !newDiversions.some(ad => ad.id === d.id))
        if (diversion) {
          newDiversions.push(diversion)
          get().addAILog(`AI Reroute: Bypass activated for ${nearby.name} via ${diversion.name}`, "action")
        }
      })
      
      get().addToast(`🛡️ Multi-Route AI Active — ${newDiversions.length} alternative paths deployed`)
    }

    set(state => ({
      nodes: state.nodes.map(n => n.id === nodeId ? { ...n, status, avgSpeed: newSpeed, congestionIndex: newCongestion } : n),
      activeDiversions: newDiversions,
      incidents: [{ id: Date.now().toString(), nodeId, type: eventType, severity: intensity, timestamp: new Date().toLocaleTimeString(), status: "ACTIVE" }, ...state.incidents].slice(0, 5),
      cityMetrics: { ...state.cityMetrics, activeIncidents: state.cityMetrics.activeIncidents + 1 }
    }))

    // Re-check navigation route if active
    if (get().navigationRoute) {
      get().calculateRoute()
    }
  },

  clearAllEvents: () => {
    get().addAILog("All active events cleared by operator.", "action")
    set(state => ({
      nodes: state.nodes.map(n => ({ ...n, status: "clear", avgSpeed: 45, congestionIndex: 20 })),
      activeDiversions: [],
      incidents: state.incidents.map(inc => ({ ...inc, status: "RESOLVED" })),
      cityMetrics: { ...state.cityMetrics, activeIncidents: 0 }
    }))
  },

  updateSimulationTick: () => {
    set(state => {
      const newNodes = state.nodes.map(n => {
        let newTimer = n.signalTimer - 3;
        let newPhase = n.signalPhase;
        if (newTimer <= 0) {
          newTimer = Math.floor(Math.random() * 30) + 15;
          newPhase = newPhase === "GREEN" ? "YELLOW" : newPhase === "YELLOW" ? "RED" : "GREEN";
        }
        return {
          ...n,
          vehicleCount: Math.max(0, n.vehicleCount + Math.floor(Math.random() * 21) - 10),
          signalTimer: newTimer,
          signalPhase: newPhase
        }
      });
      const newTotal = newNodes.reduce((acc, n) => acc + n.vehicleCount, 0) * 10 + Math.floor(Math.random() * 500);
      return {
        nodes: newNodes,
        cityMetrics: {
          ...state.cityMetrics,
          totalVehicles: newTotal,
          flowHistory: [...state.cityMetrics.flowHistory.slice(1), { time: new Date().toLocaleTimeString(), value: newTotal }]
        }
      }
    })
  }
}))
