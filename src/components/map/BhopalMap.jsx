import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createPinIcon } from './MapPin'
import { useCityStore } from '../../store/cityStore'
import { TrafficMapOverlay } from './TrafficMapOverlay'
import { UnifiedAssetOverlay } from './UnifiedAssetOverlay'

const BHOPAL_CENTER = [23.2599, 77.4126]
const SATELLITE_TILE = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
const TRAFFIC_TILE = 'https://mt1.google.com/vt/lyrs=m,traffic&x={x}&y={y}&z={z}' // Google Roadmap + Live Traffic

export function BhopalMap() {
  const { activeSection } = useCityStore()
  const isTrafficView = activeSection === 'traffic'

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <MapContainer center={BHOPAL_CENTER} zoom={13} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
        <TileLayer 
          url={isTrafficView ? TRAFFIC_TILE : SATELLITE_TILE} 
          attribution="© Google Maps" 
          opacity={isTrafficView ? 1 : 0.8} 
        />
        
        <UnifiedAssetOverlay />

        {!isTrafficView && (
          <TileLayer 
            url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
            opacity={0.6}
          />
        )}

        {isTrafficView && <TrafficMapOverlay />}
      </MapContainer>
      
      {/* Map Vignette Overlay */}
      <div className="absolute inset-0 z-[400] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#060b13_120%)]"></div>
    </div>
  )
}
