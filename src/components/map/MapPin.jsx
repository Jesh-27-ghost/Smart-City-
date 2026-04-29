import L from 'leaflet'

export function createPinIcon(colorName, label) {
  const colors = {
    cyan: '#00f5ff',
    green: '#39ff14',
    red: '#ff2a2a',
    blue: '#3d9eff',
  }
  
  const hex = colors[colorName] || '#00f5ff'
  
  return L.divIcon({
    html: `
      <div class="group relative flex flex-col items-center pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2 mt-2 ml-2">
        <div style="background-color: ${hex}; box-shadow: 0 0 12px ${hex};" class="w-3 h-3 rounded-sm border border-slate-900 opacity-90"></div>
        <div class="mt-2 text-[8px] font-mono font-bold tracking-widest text-white whitespace-nowrap bg-panel-dark/80 px-1.5 py-0.5 rounded border border-slate-800">
          <span style="color: ${hex};" class="mr-1">●</span>
          ${label}
        </div>
        ${colorName === 'cyan' ? `<div style="background-color: ${hex}; box-shadow: 0 0 10px ${hex};" class="absolute -bottom-4 w-12 h-px"></div>` : ''}
      </div>
    `,
    iconSize: [12, 12],
    className: ''
  })
}
