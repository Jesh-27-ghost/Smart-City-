import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createPinIcon } from './MapPin'

const BHOPAL_CENTER = [23.2599, 77.4126]
const SATELLITE_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

export function BhopalMap() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <MapContainer center={BHOPAL_CENTER} zoom={13} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
        <TileLayer 
          url={SATELLITE_TILE} 
          attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community" 
          opacity={0.8} 
        />
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          opacity={0.6}
        />
        
        {/* Mock Pins matching screenshot */}
        <Marker position={[23.2323, 77.4344]} icon={createPinIcon('blue', 'BIN_042 (64%)')}>
        </Marker>
        <Marker position={[23.2500, 77.4000]} icon={createPinIcon('green', 'AVAILABLE')}>
        </Marker>
        <Marker position={[23.2100, 77.4200]} icon={createPinIcon('red', 'CAPACITY ALERT')}>
        </Marker>
        <Marker position={[23.2650, 77.4100]} icon={createPinIcon('cyan', 'TRAFFIC NODE')}>
        </Marker>
      </MapContainer>
      
      {/* Map Vignette Overlay */}
      <div className="absolute inset-0 z-[400] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#060b13_120%)]"></div>
    </div>
  )
}
