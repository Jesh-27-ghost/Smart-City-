import { Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { useTrafficStore } from '../../store/trafficStore';
import { AlertTriangle, Info } from 'lucide-react';
import { renderToString } from 'react-dom/server';

// Custom Marker Creator
const createTrafficIcon = (status) => {
  const color = status === 'clear' ? '#39ff14' : 
                status === 'moderate' ? '#fbbf24' : 
                status === 'heavy' ? '#ff2a2a' : 
                status === 'blocked' ? '#ff2a2a' : '#ff00ff';
  
  const isBlinking = status === 'blocked' || status === 'accident';
  const animationSpeed = status === 'clear' ? '3s' : status === 'moderate' ? '1.5s' : '0.5s';
  const icon = status === 'accident' ? '⚠️' : status === 'blocked' ? '🚫' : '';

  const html = `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-8 h-8 rounded-full border-2 opacity-50 ${isBlinking ? 'animate-pulse' : ''}" 
           style="border-color: ${color}; animation: ping ${animationSpeed} cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div class="relative w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" 
           style="background-color: ${color}; box-shadow: 0 0 15px ${color};">
        ${icon}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'traffic-marker',
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

export function TrafficMapOverlay() {
  const map = useMap();
  const { nodes, corridors, activeDiversions, navigationRoute, selectedNodeId, setSelectedNodeId } = useTrafficStore();

  // Fly to selected node
  useEffect(() => {
    if (selectedNodeId) {
      const node = nodes.find(n => n.id === selectedNodeId);
      if (node) {
        map.flyTo([node.lat, node.lng], 16, { duration: 1.5 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodeId, map]);

  return (
    <>
      {/* ROAD CORRIDORS */}
      {corridors.map(corr => {
        const isCongested = nodes.some(n => corr.points.some(p => p[0] === n.lat && p[1] === n.lng) && (n.status === 'heavy' || n.status === 'blocked' || n.status === 'accident'));
        const color = isCongested ? '#ff2a2a' : '#00f5ff';
        return (
          <Polyline 
            key={corr.id}
            positions={corr.points}
            pathOptions={{ 
              color, 
              weight: 5, 
              opacity: 0.7, 
              dashArray: isCongested ? '5, 10' : '10, 5',
              className: isCongested ? 'animate-dash' : '' 
            }}
          />
        );
      })}

      {/* NAVIGATION ROUTE */}
      {navigationRoute && (
        <Polyline 
          positions={navigationRoute.points}
          pathOptions={{ 
            color: '#39ff14', // Neon Green
            weight: 6, 
            opacity: 1, 
            dashArray: '1, 15',
            className: 'animate-dash-flow'
          }}
        />
      )}

      {/* ACTIVE DIVERSIONS */}
      {activeDiversions.map(div => (
        <Polyline 
          key={div.id}
          positions={div.points}
          pathOptions={{ 
            color: '#ff8c00', // Orange neon
            weight: 5, 
            opacity: 0.9, 
            dashArray: '10, 10',
            className: 'animate-dash-flow'
          }}
        />
      ))}

      {/* TRAFFIC NODES */}
      {nodes.map(node => (
        <Marker 
          key={node.id} 
          position={[node.lat, node.lng]} 
          icon={createTrafficIcon(node.status)}
          eventHandlers={{
            click: () => setSelectedNodeId(node.id)
          }}
        >
          <Popup className="traffic-popup">
            <div className="bg-slate-900 text-white p-2 rounded-lg border border-white/10 font-mono">
              <h4 className="text-neon-cyan font-bold text-xs uppercase">{node.name}</h4>
              <p className="text-[10px] text-slate-400 mt-1">ID: {node.id}</p>
              <div className="grid grid-cols-2 gap-2 mt-2 border-t border-white/5 pt-2">
                <div>
                  <p className="text-[8px] text-slate-500 uppercase">Vehicles</p>
                  <p className="text-xs font-bold">{node.vehicleCount}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase">Avg Speed</p>
                  <p className="text-xs font-bold text-neon-green">{node.avgSpeed} km/h</p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
