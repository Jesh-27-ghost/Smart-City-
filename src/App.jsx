import { TopBar } from './components/layout/TopBar'
import { Sidebar } from './components/layout/Sidebar'
import { BhopalMap } from './components/map/BhopalMap'
import { OverviewPanel } from './components/panels/OverviewPanel'
import { TrafficPanel } from './components/panels/TrafficPanel'
import { SafetyPanel } from './components/panels/SafetyPanel'
import { UtilitiesPanel } from './components/panels/UtilitiesPanel'
import { PredictiveAIPanel } from './components/panels/PredictiveAIPanel'
import { AssetGridPanel } from './components/panels/AssetGridPanel'
import { EnvironmentalPanel } from './components/panels/EnvironmentalPanel'
import { LogisticsPanel } from './components/panels/LogisticsPanel'
import { WeatherFullPanel } from './components/panels/WeatherFullPanel'
import { SmartParkingPanel } from './components/panels/SmartParkingPanel'
import SmartBinPanel from './components/panels/SmartBinPanel'
import { useCityStore } from './store/cityStore'

function App() {
  const { activeSection } = useCityStore()

  return (
    <div className="h-screen w-screen flex bg-panel-deep overflow-hidden">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content area on the right */}
      <div className="flex-1 flex flex-col relative">
        <TopBar />
        
        <main className="flex-1 relative flex">
          <BhopalMap />
          
          {/* Main content overlay (Map is below this) */}
          <div className="absolute inset-0 p-6 overflow-hidden pointer-events-none">
            <div className="w-full h-full pointer-events-none">
              {activeSection === 'command-center' && <OverviewPanel />}
              {activeSection === 'traffic' && <TrafficPanel />}
              {activeSection === 'safety' && <SafetyPanel />}
              {activeSection === 'utilities' && <UtilitiesPanel />}
              
              {/* Sidebar Navigation Items */}
              {activeSection === 'predictive-ai' && <PredictiveAIPanel />}
              {activeSection === 'asset-grid' && <AssetGridPanel />}
              {activeSection === 'environmental' && <EnvironmentalPanel />}
              {activeSection === 'weather' && <WeatherFullPanel />}
              {activeSection === 'parking' && <SmartParkingPanel />}
              {activeSection === 'logistics' && <LogisticsPanel />}
              {activeSection === 'smart-bins' && <SmartBinPanel />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
