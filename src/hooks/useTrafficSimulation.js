import { useEffect } from 'react'
import { useTrafficStore } from '../store/trafficStore'

export function useTrafficSimulation() {
  const updateSimulationTick = useTrafficStore(state => state.updateSimulationTick)
  const simulationActive = useTrafficStore(state => state.simulationActive)
  const injectEvent = useTrafficStore(state => state.injectEvent)
  const nodes = useTrafficStore(state => state.nodes)

  // Live data tick every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateSimulationTick()
    }, 3000)
    return () => clearInterval(interval)
  }, [updateSimulationTick])

  // Auto-simulate random events every 30 seconds if active
  useEffect(() => {
    if (!simulationActive) return

    const interval = setInterval(() => {
      // Pick random node that is currently clear
      const clearNodes = nodes.filter(n => n.status === "clear")
      if (clearNodes.length === 0) return

      const randomNode = clearNodes[Math.floor(Math.random() * clearNodes.length)]
      const events = ["Heavy Congestion", "Road Blockage", "Accident", "Signal Failure"]
      const randomEvent = events[Math.floor(Math.random() * events.length)]
      const intensity = Math.floor(Math.random() * 5) + 5 // 5 to 10

      injectEvent(randomNode.id, randomEvent, intensity)
    }, 30000)

    return () => clearInterval(interval)
  }, [simulationActive, nodes, injectEvent])
}
