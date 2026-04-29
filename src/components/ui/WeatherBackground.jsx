import { useEffect, useState, useMemo } from "react"

function Sun({ isNight }) {
  if (isNight) {
    return (
      <div className="absolute top-16 right-20">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 animate-pulse-slow shadow-[0_0_60px_rgba(255,255,255,0.3)]" />
          <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-gray-300/50" />
          <div className="absolute top-6 right-3 w-2 h-2 rounded-full bg-gray-300/40" />
        </div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 200 - 100}px`,
              left: `${Math.random() * 400 - 200}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="absolute top-16 right-28">
      <div className="absolute inset-0 w-36 h-36 rounded-full animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          transform: 'translate(-25%, -25%) scale(2)',
        }}
      />
      <div className="relative w-28 h-28 rounded-full shadow-[0_0_60px_rgba(251,191,36,0.6)]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fef08a 0%, #fbbf24 50%, #f59e0b 100%)',
        }}
      >
        <div className="absolute inset-0 animate-spin-slow">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-1.5 origin-left"
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.8), transparent)',
                transform: `rotate(${i * 30}deg) translateX(18px)`,
                width: '20px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Cloud({ className, size = "medium", speed = 30, opacity = 1, delay = 0, isDark = false }) {
  const sizeClasses = {
    small: "w-24 h-12",
    medium: "w-40 h-20",
    large: "w-56 h-28",
  }
  const cloudColor = isDark ? 'from-gray-400 via-gray-500 to-gray-600' : 'from-white via-gray-100 to-gray-200'

  return (
    <div className={`absolute ${className}`}
      style={{
        animation: `float-horizontal ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        opacity,
      }}
    >
      <div className={`relative ${sizeClasses[size]}`}>
        <div className={`absolute bottom-0 left-1/4 w-1/2 h-3/5 rounded-full bg-gradient-to-b ${cloudColor} shadow-inner`} />
        <div className={`absolute bottom-1/4 left-0 w-2/5 h-3/5 rounded-full bg-gradient-to-br ${cloudColor}`} />
        <div className={`absolute bottom-1/4 right-0 w-2/5 h-1/2 rounded-full bg-gradient-to-bl ${cloudColor}`} />
        <div className={`absolute top-0 left-1/3 w-1/3 h-2/3 rounded-full bg-gradient-to-b ${cloudColor}`} />
      </div>
    </div>
  )
}

function RainDrops({ intensity = "medium" }) {
  const dropCount = intensity === "heavy" ? 100 : intensity === "medium" ? 50 : 25
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(dropCount)].map((_, i) => (
        <div key={i} className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-300 to-blue-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            height: `${Math.random() * 20 + 10}px`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `rain ${Math.random() * 0.5 + 0.5}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

function Lightning() {
  const [flash, setFlash] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlash(true)
        setTimeout(() => setFlash(false), 100)
        setTimeout(() => {
          setFlash(true)
          setTimeout(() => setFlash(false), 50)
        }, 150)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${flash ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.3), transparent 70%)' }}
    />
  )
}

function Mountains({ isNight }) {
  const color1 = isNight ? '#1a1f35' : '#1e3a5f'
  const color2 = isNight ? '#151929' : '#0f2744'
  const color3 = isNight ? '#0d1424' : '#0a1628'
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
      <svg viewBox="0 0 1440 320" className="absolute bottom-12 w-full h-40" preserveAspectRatio="xMidYMax slice">
        <path d="M0,160 L120,140 L240,180 L360,120 L480,160 L600,100 L720,150 L840,110 L960,140 L1080,90 L1200,130 L1320,100 L1440,160 L1440,320 L0,320 Z" fill={color1} />
      </svg>
      <svg viewBox="0 0 1440 320" className="absolute bottom-6 w-full h-36" preserveAspectRatio="xMidYMax slice">
        <path d="M0,200 L180,160 L360,200 L540,140 L720,180 L900,130 L1080,170 L1260,150 L1440,190 L1440,320 L0,320 Z" fill={color2} />
      </svg>
      <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-32" preserveAspectRatio="xMidYMax slice">
        <path d="M0,260 L240,220 L480,250 L720,210 L960,240 L1200,200 L1440,230 L1440,320 L0,320 Z" fill={color3} />
      </svg>
    </div>
  )
}

export function WeatherBackground({ condition = "sunny", temperature = 28 }) {
  const isNight = condition === "night"
  const skyGradient = useMemo(() => {
    if (isNight) return 'linear-gradient(to bottom, #0a0f1e 0%, #1a1f35 100%)'
    if (condition === "stormy") return 'linear-gradient(to bottom, #1f2937 0%, #4b5563 100%)'
    if (condition === "rainy") return 'linear-gradient(to bottom, #374151 0%, #6b7280 100%)'
    if (temperature > 35) return 'linear-gradient(to bottom, #ea580c 0%, #fbbf24 100%)'
    return 'linear-gradient(to bottom, #0ea5e9 0%, #7dd3fc 100%)'
  }, [condition, isNight, temperature])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] rounded-2xl opacity-40">
      <div className="absolute inset-0 transition-all duration-1000" style={{ background: skyGradient }} />
      <Sun isNight={isNight} />
      {condition === "sunny" && <Cloud className="top-12" size="small" speed={45} opacity={0.6} />}
      {condition === "rainy" && <RainDrops intensity="medium" />}
      {condition === "stormy" && <><RainDrops intensity="heavy" /><Lightning /></>}
      <Mountains isNight={isNight} />
    </div>
  )
}
