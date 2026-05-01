import { Link } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'

function HydrationBar({ filled }) {
  return (
    <div className="flex gap-1.5 mt-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-full"
          style={{ height: 6, background: i < filled ? '#1e88e5' : '#dee2e6' }}
        />
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <TopBar title="Dashboard" />

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest">Status de Hoje</div>
          <h2 className="text-5xl font-extrabold text-[#1b1b1b] leading-tight">
            Rumo ao <span className="text-[#2e7d32]">Dia Perfeito.</span>
          </h2>
          <p className="text-sm text-gray-500">
            Você está a apenas quatro missões de completar seu ciclo de harmonia. Sua planta cresceu 12cm hoje.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">
              <i className="bi bi-check-circle-fill" /> 3 missões concluídas
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fff9c4] text-[#f57f17]">
              <i className="bi bi-lightning-fill" /> 4 missões restantes
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fff3e0] text-[#e65100]">
              <i className="bi bi-fire" /> 12 dias de streak
            </span>
          </div>
          <div>
            <Link
              to="/missoes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
            >
              Ver missões do dia <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

        {/* Vitality card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-1">
            <div className="text-6xl font-extrabold text-[#1b1b1b] leading-none">840</div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">+120 hoje</span>
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 mb-5">Pontos de Vitalidade</div>
          <div className="border-t border-gray-100 pt-5">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Nível 24</span><span>Nível 25</span>
            </div>
            <div className="w-full rounded-full overflow-hidden mb-3" style={{ height: 7, background: '#e0ede0' }}>
              <div className="h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, #43a047, #a5d6a7)' }} />
            </div>
            <div className="text-xs text-gray-400 mt-3">Mais 160 pontos para evoluir sua Luz Interior</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Planta Física */}
        <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#eef2ee' }}>
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <i className="bi bi-tree-fill text-[#2e7d32]" />
              <span className="font-bold text-[#1b1b1b]">Planta Física</span>
            </div>
            <div className="text-xs text-gray-400">Sua vitalidade corporal traduzida em vida.</div>
          </div>
          <div className="flex justify-center py-6 flex-1">
            <i className="bi bi-tree-fill text-[#43a047]" style={{ fontSize: '7.5rem' }} />
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-200/50 mt-auto">
            <div className="bg-white px-5 py-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Movimento</div>
              <div className="font-extrabold text-[#1b1b1b] text-2xl">8,432</div>
              <div className="text-xs text-gray-400 mt-0.5">passos</div>
            </div>
            <div className="bg-white px-5 py-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Sono</div>
              <div className="font-extrabold text-[#1b1b1b] text-2xl">7h 20m</div>
              <div className="text-xs text-gray-400 mt-0.5">restaurado</div>
            </div>
          </div>
        </div>

        {/* Luz Interior */}
        <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: 'radial-gradient(circle at 60% 40%, #dce8f5, #eaf0f8)' }}>
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <i className="bi bi-stars text-blue-500" />
              <span className="font-bold text-[#1b1b1b]">Luz Interior</span>
            </div>
            <div className="text-xs text-gray-400">Sua clareza mental e equilíbrio emocional.</div>
          </div>
          <div className="relative flex items-center justify-center py-6 flex-1" style={{ height: 140 }}>
            <div className="absolute rounded-full border-2 border-blue-200 opacity-30" style={{ width: 110, height: 110 }} />
            <div className="absolute rounded-full border-2 border-blue-300 opacity-50" style={{ width: 78, height: 78 }} />
            <div className="absolute rounded-full border-2 border-blue-400 opacity-70" style={{ width: 50, height: 50 }} />
            <div className="flex items-center justify-center rounded-full bg-white shadow-md z-10" style={{ width: 46, height: 46 }}>
              <i className="bi bi-moon-fill text-blue-500 text-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-blue-200/30 mt-auto">
            <div className="bg-white/80 px-5 py-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Meditação</div>
              <div className="font-extrabold text-[#1b1b1b] text-2xl">15</div>
              <div className="text-xs text-gray-400 mt-0.5">minutos</div>
            </div>
            <div className="bg-white/80 px-5 py-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Foco</div>
              <div className="font-extrabold text-[#1b1b1b] text-2xl">92%</div>
              <div className="text-xs text-gray-400 mt-0.5">concluído</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Missions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-[#1b1b1b]">Missões do Dia</h2>
          <Link to="/missoes" className="text-sm font-semibold text-[#2e7d32] no-underline hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">

          {/* Caminhada */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm col-span-2 flex flex-col justify-between" style={{ minHeight: 180 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 50, height: 50, background: '#f0faf0' }}>
                <i className="bi bi-person-walking text-[#2e7d32] text-2xl" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#1b1b1b] text-base">Caminhada Revigorante</div>
                <div className="text-sm text-gray-400 mt-0.5">Faltam apenas 1.568 passos para a meta.</div>
              </div>
              <div className="text-base font-extrabold text-[#2e7d32]">80%</div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1">
                <div className="w-full rounded-full overflow-hidden" style={{ height: 7, background: '#e0ede0' }}>
                  <div className="h-full rounded-full" style={{ width: '80%', background: '#43a047' }} />
                </div>
              </div>
              <button className="flex items-center justify-center rounded-full border border-gray-200 hover:bg-[#e8f5e9] transition-colors shrink-0" style={{ width: 38, height: 38 }}>
                <i className="bi bi-arrow-right text-[#2e7d32]" />
              </button>
            </div>
          </div>

          {/* Hidratação */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 50, height: 50, background: '#e3f2fd' }}>
                <i className="bi bi-droplet-fill text-blue-500 text-2xl" />
              </div>
              <div>
                <div className="font-bold text-[#1b1b1b] text-base">Hidratação</div>
                <div className="text-sm text-gray-400 mt-0.5">6 de 8 copos</div>
              </div>
            </div>
            <HydrationBar filled={6} />
          </div>

          {/* Respiro Consciente */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm col-span-2 flex flex-col justify-between" style={{ minHeight: 180 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 50, height: 50, background: '#fff3e0' }}>
                <i className="bi bi-person text-orange-500 text-2xl" />
              </div>
              <div>
                <div className="font-bold text-[#1b1b1b] text-base">Respiro Consciente</div>
                <div className="text-sm text-gray-400 mt-0.5">Sessão de 5 min</div>
              </div>
            </div>
            <button className="w-full py-3 rounded-full text-sm font-bold border border-gray-200 text-[#1b1b1b] hover:bg-gray-50 transition-colors mt-4">
              Iniciar Agora
            </button>
          </div>

          {/* Yoga card */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm" style={{ minHeight: 180 }}>
            <img
              src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=900&auto=format&fit=crop&q=60"
              alt="Yoga"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 100%)' }} />
            <div className="absolute top-4 right-4">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Ao Vivo
              </span>
            </div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full" style={{ minHeight: 180 }}>
              <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Evento ao Vivo</div>
              <div className="font-extrabold text-white text-xl">Yoga Sunset Flow</div>
              <div className="text-sm text-white/80 mt-0.5">Começa em 45 minutos · 1.2k membros</div>
            </div>
          </div>

        </div>
     </div>
    </div>
  )
}
