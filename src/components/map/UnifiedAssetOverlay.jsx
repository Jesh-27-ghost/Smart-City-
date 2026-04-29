import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createPinIcon } from './MapPin';
import { useTrafficStore } from '../../store/trafficStore';
import { useCityStore } from '../../store/cityStore';

const CITY_ASSETS = [
  // SMART BINS
  { id: 'BIN-01', type: 'bin', name: 'Smart Bin B-12', pos: [23.2323, 77.4344], status: '64%', color: 'blue' },
  { id: 'BIN-02', type: 'bin', name: 'Smart Bin B-09', pos: [23.2100, 77.4200], status: 'CAPACITY ALERT', color: 'red' },
  { id: 'BIN-03', type: 'bin', name: 'Smart Bin B-22', pos: [23.2450, 77.4450], status: '22%', color: 'blue' },
  { id: 'BIN-04', type: 'bin', name: 'Smart Bin K-01', pos: [23.1802, 77.4374], status: '45%', color: 'blue' },
  { id: 'BIN-05', type: 'bin', name: 'Smart Bin A-15', pos: [23.2150, 77.4100], status: '92% CRITICAL', color: 'red' },
  { id: 'BIN-06', type: 'bin', name: 'Smart Bin M-05', pos: [23.1850, 77.4600], status: '12%', color: 'blue' },
  { id: 'BIN-07', type: 'bin', name: 'Smart Bin H-02', pos: [23.2750, 77.3800], status: '88% ALERT', color: 'red' },
  
  // PARKING
  { id: 'PRK-01', type: 'parking', name: 'DB Mall Parking', pos: [23.2330, 77.4300], status: 'AVAILABLE', color: 'green' },
  { id: 'PRK-02', type: 'parking', name: 'New Market Multi-Level', pos: [23.2275, 77.4019], status: 'FULL', color: 'red' },
  { id: 'PRK-03', type: 'parking', name: 'Habibganj Station', pos: [23.2150, 77.4400], status: 'AVAILABLE', color: 'green' },
  { id: 'PRK-04', type: 'parking', name: '10 Number Market', pos: [23.2170, 77.4250], status: 'LIMITED', color: 'orange' },
  { id: 'PRK-05', type: 'parking', name: 'Chetak Bridge Lot', pos: [23.2385, 77.4195], status: 'AVAILABLE', color: 'green' },
  { id: 'PRK-06', type: 'parking', name: 'Ashoka Garden Lot', pos: [23.2500, 77.4400], status: 'FULL', color: 'red' },

  // UTILITIES (Power/Voltage)
  { id: 'PWR-01', type: 'utility', name: 'Substation G-04', pos: [23.2500, 77.4200], status: '11kV NORMAL', color: 'cyan' },
  { id: 'PWR-02', type: 'utility', name: 'Transformer T-11', pos: [23.2600, 77.3900], status: 'VOLTAGE SURGE', color: 'orange' },
  { id: 'PWR-03', type: 'utility', name: 'Govindpura Grid', pos: [23.2400, 77.4600], status: '33kV NORMAL', color: 'cyan' },
  { id: 'PWR-04', type: 'utility', name: 'Arera Substation', pos: [23.2200, 77.4100], status: 'LOAD SHEDDING', color: 'red' },
  
  // SMART POLES & IOT
  { id: 'POL-01', type: 'pole', name: 'Smart Pole S-88', pos: [23.2599, 77.4126], status: 'ONLINE', color: 'purple' },
  { id: 'POL-02', type: 'pole', name: 'Smart Pole K-12', pos: [23.1900, 77.4350], status: 'ONLINE', color: 'purple' },
  { id: 'POL-03', type: 'pole', name: 'Smart Pole M-01', pos: [23.2300, 77.4500], status: 'OFFLINE', color: 'red' },
  { id: 'POL-04', type: 'pole', name: 'Smart Pole B-07', pos: [23.2800, 77.3600], status: 'ONLINE', color: 'purple' },
  { id: 'POL-05', type: 'pole', name: 'Smart Pole I-03', pos: [23.2550, 77.4700], status: 'ONLINE', color: 'purple' },
];

export function UnifiedAssetOverlay() {
  const { activeSection } = useCityStore();
  const { nodes: trafficNodes, incidents } = useTrafficStore();

  // Determine visibility based on active section
  const showBins = activeSection === 'smart-bins' || activeSection === 'command-center';
  const showParking = activeSection === 'parking' || activeSection === 'command-center';
  const showUtilities = activeSection === 'utilities' || activeSection === 'command-center';
  const showTrafficNodes = activeSection === 'traffic' || activeSection === 'command-center';

  return (
    <>
      {/* STATIC CITY ASSETS */}
      {CITY_ASSETS.map(asset => {
        if (asset.type === 'bin' && !showBins) return null;
        if (asset.type === 'parking' && !showParking) return null;
        if (asset.type === 'utility' && !showUtilities) return null;
        if (asset.type === 'pole' && activeSection !== 'overview') return null;

        return (
          <Marker 
            key={asset.id} 
            position={asset.pos} 
            icon={createPinIcon(asset.color, `${asset.name} (${asset.status})`)}
          />
        );
      })}

      {/* TRAFFIC ALERTS (INCIDENTS) */}
      {incidents.map(inc => {
        const node = trafficNodes.find(n => n.id === inc.nodeId);
        if (!node) return null;
        return (
          <Marker 
            key={`inc-${inc.id}`}
            position={[node.lat, node.lng]}
            icon={createPinIcon('red', `⚠️ ${inc.type}`)}
          />
        );
      })}
    </>
  );
}
