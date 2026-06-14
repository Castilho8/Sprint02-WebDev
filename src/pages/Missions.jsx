import { useState, useEffect } from 'react'
import TopBar from '../components/ui/TopBar'
import ProgressRing from '../components/ui/ProgressRing'
import { useTheme } from '../context/ThemeContext'

const TABS = [
  { id: 'all', label: 'Todas', icon: '' },
  { id: 'fisica', label: 'Física', icon: 'bi-person-walking' },
  { id: 'mental', label: 'Mental', icon: 'bi-peace-fill' },
  { id: 'done', label: 'Concluídas', icon: 'bi-check-circle-fill' },
]

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
const DAY_STATES = ['done', 'done', 'done', 'done', 'today', 'empty', 'empty']

function MissionCard({ mission, onToggle }) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
        mission.completed ? 'opacity-70 bg-gray-50' : ''
      }`}
      onClick={() => onToggle(mission.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 48, height: 48, background: mission.iconBg }}
          >
            <i className={`bi ${mission.icon} text-xl`} style={{ color: mission.iconColor }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#1b1b1b]">{mission.title}</span>
              {mission.live && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" /> Ao Vivo
                </span>
              )}
              {mission.completed && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">
                  Concluída
                </span>
              )}
            </div>
            {mission.progress !== null ? (
              <div className="text-xs text-gray-400">
                {mission.current}{mission.max ? ` / ${mission.max}` : ''} {mission.unit}
              </div>
            ) : (
              <div className="text-xs text-gray-400">{mission.startable ? '5 minutos · meditação' : 'Aula ao vivo'}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">
            +{mission.xp} XP
          </span>
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
              mission.completed
                ? 'bg-[#2e7d32] border-[#2e7d32] text-white'
                : 'border-gray-300 text-transparent hover:border-[#2e7d32]'
            }`}
          >
            <i className="bi bi-check-lg text-sm" />
          </div>
        </div>
      </div>

      {mission.progress !== null && (
        <div className="mt-3">
          <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: '#e0ede0' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${mission.progress}%`,
                background: mission.category === 'mental' ? '#1e88e5' : '#43a047',
              }}
            />
          </div>
          <div className="text-xs font-bold mt-1" style={{ color: mission.category === 'mental' ? '#1e88e5' : '#2e7d32' }}>
            {mission.progress}%
          </div>
        </div>
      )}

      {mission.startable && !mission.completed && (
        <button
          className="mt-3 w-full py-2 rounded-full text-sm font-bold bg-[#fff3e0] text-[#e65100] hover:bg-[#e65100] hover:text-white transition-colors"
          onClick={e => e.stopPropagation()}
        >
          Iniciar
        </button>
      )}
    </div>
  )
}

export default function Missions() {
  const [activeTab, setActiveTab] = useState('all')
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const { dark } = useTheme()

  useEffect(() => {
    fetch('/data/missoes.json')
      .then(r => r.json())
      .then(data => { setMissions(data); setLoading(false) })
  }, [])

  const toggleMission = (id) => {
    setMissions(ms => ms.map(m => m.id === id ? { ...m, completed: !m.completed } : m))
  }

  const visible = missions.filter(m => {
    if (activeTab === 'all') return true
    if (activeTab === 'done') return m.completed
    return m.category === activeTab
  })

  const fisica = visible.filter(m => m.category === 'fisica')
  const mental = visible.filter(m => m.category === 'mental')
  const showFisica = activeTab === 'all' || activeTab === 'fisica' || activeTab === 'done'
  const showMental = activeTab === 'all' || activeTab === 'mental' || activeTab === 'done'

  const total = missions.length
  const done = missions.filter(m => m.completed).length

  if (loading) return (
    <div>
      <TopBar title="Missões" />
      <div className="flex items-center justify-center py-20 text-gray-400">
        <i className="bi bi-arrow-repeat animate-spin text-2xl mr-2" />
        Carregando missões...
      </div>
    </div>
  )

  return (
    <div>
      <TopBar title="Missões" />

      {/* Progresso principal */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{ background: dark ? '#162032' : '#f4f6f4' }}
      >
        <h2 className="text-2xl font-extrabold text-[#1b1b1b] mb-1">
          {done} de {total} missões concluídas
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Complete mais {total - done} missões para garantir seu Dia Perfeito...
        </p>

        {/* Calendário semanal */}
        <div className="flex gap-2 mb-5">
          {DAYS.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400 font-medium">{d}</span>
              <div
                className={`flex items-center justify-center rounded-full text-sm font-bold`}
                style={{
                  width: 38, height: 38,
                  background: DAY_STATES[i] === 'done' ? '#2e7d32' : 'transparent',
                  border: DAY_STATES[i] === 'today' ? '2px solid #2e7d32' : DAY_STATES[i] === 'done' ? 'none' : '2px solid #dee2e6',
                  color: DAY_STATES[i] === 'done' ? 'white' : DAY_STATES[i] === 'today' ? '#2e7d32' : '#aaa',
                }}
              >
                {DAY_STATES[i] === 'done' ? <i className="bi bi-check-lg" /> : i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Anéis de progresso */}
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-1">
            <ProgressRing percent={71} color="#2e7d32" />
            <span className="text-xs font-bold text-[#2e7d32]">71%</span>
            <span className="text-xs text-gray-400">Total</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ProgressRing percent={80} color="#43a047" />
            <span className="text-xs font-bold text-[#43a047]">80%</span>
            <span className="text-xs text-gray-400">Física</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ProgressRing percent={50} color="#1e88e5" />
            <span className="text-xs font-bold text-blue-500">50%</span>
            <span className="text-xs text-gray-400">Mental</span>
          </div>
        </div>
      </div>

      {/* Abas de navegação */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              activeTab === tab.id
                ? 'bg-[#2e7d32] text-white border-[#2e7d32]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2e7d32] hover:text-[#2e7d32]'
            }`}
          >
            {tab.icon && <i className={`bi ${tab.icon}`} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Missões Físicas */}
      {showFisica && fisica.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <i className="bi bi-person-walking text-[#2e7d32]" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Missões Físicas</span>
          </div>
          <div className="flex flex-col gap-3">
            {fisica.map(m => <MissionCard key={m.id} mission={m} onToggle={toggleMission} />)}
          </div>
        </div>
      )}

      {/* Missões Mentais */}
      {showMental && mental.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <i className="bi bi-peace-fill text-blue-500" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Missões Mentais</span>
          </div>
          <div className="flex flex-col gap-3">
            {mental.map(m => <MissionCard key={m.id} mission={m} onToggle={toggleMission} />)}
          </div>
        </div>
      )}

      {visible.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <i className="bi bi-check-circle text-4xl block mb-2" />
          <p>Nenhuma missão nesta categoria ainda.</p>
        </div>
      )}
    </div>
  )
}
