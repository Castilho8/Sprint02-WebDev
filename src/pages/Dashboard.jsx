import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import Modal from '../components/ui/Modal'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const MONITORING_QUESTIONS = [
  { id: 'bemestar', label: 'Como está seu nível de bem-estar geral?', shortLabel: 'Bem-estar', inverted: false, lowLabel: 'Muito baixo', highLabel: 'Muito alto' },
  { id: 'estresse', label: 'Como você avalia seu nível de estresse?', shortLabel: 'Estresse', inverted: true, lowLabel: 'Sem estresse', highLabel: 'Muito estressado' },
  { id: 'sono', label: 'Como foi a qualidade do seu sono?', shortLabel: 'Sono', inverted: false, lowLabel: 'Muito ruim', highLabel: 'Excelente' },
  { id: 'motivacao', label: 'Como está sua motivação e disposição?', shortLabel: 'Motivação', inverted: false, lowLabel: 'Nenhuma', highLabel: 'Muito alta' },
  { id: 'habitos', label: 'Como estão seus hábitos saudáveis?', shortLabel: 'Hábitos', inverted: false, lowLabel: 'Péssimos', highLabel: 'Excelentes' },
  { id: 'ansiedade', label: 'Com que intensidade você sente ansiedade ou sobrecarga?', shortLabel: 'Ansiedade', inverted: true, lowLabel: 'Nenhuma', highLabel: 'Muito intensa' },
  { id: 'satisfacao', label: 'Como está sua satisfação com a rotina de trabalho?', shortLabel: 'Satisfação', inverted: false, lowLabel: 'Muito insatisfeito', highLabel: 'Muito satisfeito' },
]

function calcWellnessScore(answers) {
  const scores = MONITORING_QUESTIONS.map(q => {
    const v = answers[q.id] || 3
    return q.inverted ? (6 - v) : v
  })
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.round(((avg - 1) / 4) * 100)
}

function getWellnessRisk(score) {
  if (score >= 81) return { label: 'Excelente', color: '#2e7d32', bg: '#e8f5e9', darkBg: '#0d2211', icon: 'bi-emoji-laughing-fill', msg: 'Parabéns! Seus indicadores estão ótimos. Continue assim!' }
  if (score >= 61) return { label: 'Bom', color: '#388e3c', bg: '#f1f8e9', darkBg: '#0d2211', icon: 'bi-emoji-smile-fill', msg: 'Seus indicadores estão bons. Fique atento a pequenas melhorias na rotina.' }
  if (score >= 41) return { label: 'Atenção', color: '#f57c00', bg: '#fff3e0', darkBg: '#2a1f0f', icon: 'bi-exclamation-triangle-fill', msg: 'Atenção: alguns indicadores precisam de cuidado. Considere ajustes na sua rotina.' }
  return { label: 'Risco', color: '#c62828', bg: '#ffebee', darkBg: '#2a1010', icon: 'bi-exclamation-circle-fill', msg: 'Identificamos possíveis riscos à sua saúde. O RH será notificado para oferecer suporte adequado.' }
}

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
  const [phase, setPhase] = useState('idle')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [wellnessScore, setWellnessScore] = useState(null)
  const [lastEvalDate, setLastEvalDate] = useState(() => {
    const stored = localStorage.getItem('carefit_last_evaluation')
    return stored ? new Date(stored) : null
  })

  const nextEvalDate = lastEvalDate
    ? new Date(lastEvalDate.getTime() + 15 * 24 * 60 * 60 * 1000)
    : null
  const isAvailable = !nextEvalDate || new Date() >= nextEvalDate
  const daysRemaining = nextEvalDate && !isAvailable
    ? Math.ceil((nextEvalDate - new Date()) / (1000 * 60 * 60 * 24))
    : 0
  const formatDate = (date) => date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })

  const handleAnswer = (val) => {
    const q = MONITORING_QUESTIONS[currentQ]
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (currentQ < MONITORING_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(c => c + 1), 220)
    } else {
      setTimeout(() => {
        setWellnessScore(calcWellnessScore(newAnswers))
        setPhase('result')
      }, 220)
    }
  }

  const [missionsCompleted, setMissionsCompleted] = useState({})

  useEffect(() => {
    fetch('/data/missoes.json')
      .then(r => r.json())
      .then(data => {
        const saved = JSON.parse(localStorage.getItem('carefit_missions_state') || '{}')
        const result = {}
        data.forEach(m => { result[m.id] = m.id in saved ? saved[m.id] : m.completed })
        setMissionsCompleted(result)
      })
  }, [])

  const totalMissions = Object.keys(missionsCompleted).length
  const doneMissions = Object.values(missionsCompleted).filter(Boolean).length

  const { dark } = useTheme()
  const { user } = useAuth()
  const firstName = user?.nome?.split(' ')[0] || ''
  const q = MONITORING_QUESTIONS[currentQ]
  const riskInfo = wellnessScore !== null ? getWellnessRisk(wellnessScore) : null

  return (
    <div className="flex flex-col gap-6">
      <TopBar title="Dashboard" />

      {/* Cabeçalho */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest">Status de Hoje</div>
          {firstName && (
            <div className="text-sm font-semibold text-gray-500 dark:text-slate-400 -mt-1">
              Bom dia, {firstName}!
            </div>
          )}
          <h2 className="text-5xl font-extrabold text-[#1b1b1b] leading-tight">
            Rumo ao <span className="text-[#2e7d32]">Dia Perfeito.</span>
          </h2>
          <p className="text-sm text-gray-500">
            Você está a apenas quatro missões de completar seu ciclo de harmonia. Sua planta cresceu 12cm hoje.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">
              <i className="bi bi-check-circle-fill" /> {doneMissions} missões concluídas
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fff9c4] text-[#f57f17]">
              <i className="bi bi-lightning-fill" /> {totalMissions - doneMissions} missões restantes
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

        {/* Card de vitalidade */}
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

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Planta Física */}
        <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: dark ? '#162032' : '#eef2ee' }}>
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
        <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: dark ? 'radial-gradient(circle at 60% 40%, #162032, #1e293b)' : 'radial-gradient(circle at 60% 40%, #dce8f5, #eaf0f8)' }}>
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

      {/* Monitoramento Preventivo */}
      {phase === 'idle' && (
        <div
          className="rounded-2xl border p-5 shadow-sm"
          style={{ background: dark ? 'linear-gradient(135deg, #1e0a2e 0%, #2a1045 100%)' : 'linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%)', borderColor: dark ? '#6a1b9a' : '#ce93d8' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 48, height: 48, background: '#e1bee7' }}
              >
                <i className="bi bi-heart-pulse-fill text-2xl" style={{ color: '#6a1b9a' }} />
              </div>
              <div>
                <div className="font-bold text-[#1b1b1b] text-base">Monitoramento Preventivo Inteligente</div>
                <div className="text-sm text-gray-500 mt-0.5">Questionário quinzenal de saúde física e mental.</div>
                {isAvailable ? (
                  <div className="text-xs font-semibold mt-1" style={{ color: '#6a1b9a' }}>
                    <i className="bi bi-calendar3 me-1" /> Próxima avaliação: disponível agora
                  </div>
                ) : (
                  <div className="text-xs font-semibold mt-1 text-gray-400">
                    <i className="bi bi-calendar3 me-1" />
                    Próxima avaliação: {formatDate(nextEvalDate)} · {daysRemaining} {daysRemaining === 1 ? 'dia restante' : 'dias restantes'}
                  </div>
                )}
              </div>
            </div>
            {isAvailable ? (
              <button
                onClick={() => setPhase('consent')}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white shrink-0 hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #6a1b9a, #ab47bc)' }}
              >
                <i className="bi bi-clipboard2-pulse-fill me-1" /> Responder agora
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-full text-sm font-semibold text-gray-400 border border-gray-200 bg-white shrink-0">
                <i className="bi bi-clock me-1" /> {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Formulário passo a passo */}
      {phase === 'form' && (
        <div className="bg-white rounded-2xl border p-6 shadow-sm" style={{ borderColor: '#ce93d8' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold" style={{ color: '#6a1b9a' }}>
              Pergunta {currentQ + 1} de {MONITORING_QUESTIONS.length}
            </span>
            <button
              onClick={() => setPhase('idle')}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none bg-transparent border-0"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
          <div className="w-full rounded-full overflow-hidden mb-5" style={{ height: 6, background: '#ede7f6' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQ + 1) / MONITORING_QUESTIONS.length) * 100}%`,
                background: 'linear-gradient(90deg, #6a1b9a, #ab47bc)',
              }}
            />
          </div>
          <h3 className="font-bold text-[#1b1b1b] text-base mb-5">{q.label}</h3>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{q.lowLabel}</span>
            <span>{q.highLabel}</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(val => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`flex-1 py-4 rounded-xl font-extrabold text-xl transition-all hover:scale-105 ${answers[q.id] === val ? 'scale-105' : ''}`}
                style={
                  answers[q.id] === val
                    ? { background: 'linear-gradient(135deg, #6a1b9a, #ab47bc)', color: 'white' }
                    : { background: '#f3e5f5', color: '#6a1b9a' }
                }
              >
                {val}
              </button>
            ))}
          </div>
          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ(c => c - 1)}
              className="mt-5 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-0"
            >
              <i className="bi bi-arrow-left" /> Pergunta anterior
            </button>
          )}
        </div>
      )}

      {/* Resultado */}
      {phase === 'result' && riskInfo && (
        <div
          className="rounded-2xl border p-6 shadow-sm"
          style={{ background: dark ? riskInfo.darkBg : riskInfo.bg, borderColor: riskInfo.color + '60' }}
        >
          <div className="text-center mb-5">
            <i className={`bi ${riskInfo.icon} text-5xl`} style={{ color: riskInfo.color }} />
            <div className="text-5xl font-extrabold mt-2" style={{ color: riskInfo.color }}>{wellnessScore}</div>
            <div className="text-sm font-bold mt-1" style={{ color: riskInfo.color }}>
              Índice de Bem-Estar · {riskInfo.label}
            </div>
          </div>
          <div className="w-full rounded-full overflow-hidden mb-4" style={{ height: 10, background: 'rgba(0,0,0,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${wellnessScore}%`, background: riskInfo.color }}
            />
          </div>
          <p className="text-sm text-center mb-5" style={{ color: riskInfo.color }}>{riskInfo.msg}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {MONITORING_QUESTIONS.map(mq => (
              <div key={mq.id} className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="font-bold text-base" style={{ color: riskInfo.color }}>{answers[mq.id] || '—'}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-tight">{mq.shortLabel}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                const now = new Date()
                localStorage.setItem('carefit_last_evaluation', now.toISOString())
                setLastEvalDate(now)
                setPhase('idle')
                setWellnessScore(null)
                setAnswers({})
              }}
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #6a1b9a, #ab47bc)' }}
            >
              <i className="bi bi-check-circle-fill me-1" /> Concluir avaliação
            </button>
          </div>
        </div>
      )}

      {/* Modal de consentimento */}
      <Modal
        open={phase === 'consent'}
        onClose={() => setPhase('idle')}
        title="Termo de Consentimento para Monitoramento Preventivo"
        footer={
          <>
            <button
              onClick={() => setPhase('idle')}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-500 hover:border-gray-400 transition-colors"
            >
              Recusar
            </button>
            <button
              onClick={() => { setPhase('form'); setCurrentQ(0); setAnswers({}) }}
              className="px-5 py-2 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #6a1b9a, #ab47bc)' }}
            >
              Aceitar e Continuar
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Ao prosseguir, você declara que fornecerá informações verdadeiras e compreende que os dados serão utilizados exclusivamente para acompanhamento de saúde e bem-estar.
        </p>
        <div className="rounded-xl p-4 mb-3" style={{ background: '#f3e5f5' }}>
          <div className="font-semibold text-sm mb-2" style={{ color: '#4a148c' }}>O questionário contém perguntas sobre:</div>
          <ul className="text-sm space-y-1" style={{ color: '#6a1b9a' }}>
            {['Nível de bem-estar geral', 'Nível de estresse', 'Qualidade do sono', 'Motivação e disposição', 'Hábitos saudáveis', 'Sinais de ansiedade, esgotamento ou sobrecarga', 'Satisfação com a rotina de trabalho'].map(item => (
              <li key={item} className="flex items-center gap-2">
                <i className="bi bi-check2 text-purple-400" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          O RH será notificado <strong>apenas</strong> em caso de identificação de indicadores de risco, sem acesso às respostas completas. Em conformidade com a LGPD (Lei nº 13.709/2018).
        </p>
      </Modal>

      {/* Missões do Dia */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-[#1b1b1b]">Missões do Dia</h2>
          <Link to="/missoes" className="text-sm font-semibold text-[#2e7d32] no-underline hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">

          {/* Caminhada */}
          <div className={`rounded-2xl p-6 border shadow-sm col-span-2 flex flex-col justify-between transition-colors ${missionsCompleted[1] ? 'bg-[#e8f5e9] border-[#a5d6a7]' : 'bg-white border-gray-100'}`} style={{ minHeight: 180 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 50, height: 50, background: missionsCompleted[1] ? '#c8e6c9' : '#f0faf0' }}>
                <i className={`bi ${missionsCompleted[1] ? 'bi-check-lg' : 'bi-person-walking'} text-[#2e7d32] text-2xl`} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#1b1b1b] text-base">Caminhada Revigorante</div>
                <div className="text-sm text-gray-400 mt-0.5">
                  {missionsCompleted[1] ? 'Meta concluída! Parabéns.' : 'Faltam apenas 1.568 passos para a meta.'}
                </div>
              </div>
              {missionsCompleted[1]
                ? <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#2e7d32] text-white">Concluída</span>
                : <div className="text-base font-extrabold text-[#2e7d32]">80%</div>
              }
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1">
                <div className="w-full rounded-full overflow-hidden" style={{ height: 7, background: '#e0ede0' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: missionsCompleted[1] ? '100%' : '80%', background: '#43a047' }} />
                </div>
              </div>
              <div className={`flex items-center justify-center rounded-full shrink-0 ${missionsCompleted[1] ? 'bg-[#2e7d32]' : 'border border-gray-200 hover:bg-[#e8f5e9]'}`} style={{ width: 38, height: 38 }}>
                <i className={`bi ${missionsCompleted[1] ? 'bi-check-lg text-white' : 'bi-arrow-right text-[#2e7d32]'}`} />
              </div>
            </div>
          </div>

          {/* Hidratação */}
          <div className={`rounded-2xl p-6 border shadow-sm transition-colors ${missionsCompleted[2] ? 'bg-[#e3f2fd] border-blue-200' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 50, height: 50, background: missionsCompleted[2] ? '#bbdefb' : '#e3f2fd' }}>
                <i className={`bi ${missionsCompleted[2] ? 'bi-check-lg' : 'bi-droplet-fill'} text-blue-500 text-2xl`} />
              </div>
              <div>
                <div className="font-bold text-[#1b1b1b] text-base">Hidratação</div>
                <div className="text-sm text-gray-400 mt-0.5">{missionsCompleted[2] ? 'Meta atingida!' : '6 de 8 copos'}</div>
              </div>
            </div>
            <HydrationBar filled={missionsCompleted[2] ? 8 : 6} />
          </div>

          {/* Respiro Consciente */}
          <div className={`rounded-2xl p-6 border shadow-sm col-span-2 flex flex-col justify-between transition-colors ${missionsCompleted[6] ? 'bg-[#fff3e0] border-orange-200' : 'bg-white border-gray-100'}`} style={{ minHeight: 180 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 50, height: 50, background: missionsCompleted[6] ? '#ffe0b2' : '#fff3e0' }}>
                <i className={`bi ${missionsCompleted[6] ? 'bi-check-lg text-orange-500' : 'bi-person text-orange-500'} text-2xl`} />
              </div>
              <div>
                <div className="font-bold text-[#1b1b1b] text-base">Respiro Consciente</div>
                <div className="text-sm text-gray-400 mt-0.5">{missionsCompleted[6] ? 'Sessão concluída!' : 'Sessão de 5 min'}</div>
              </div>
            </div>
            {missionsCompleted[6]
              ? <div className="w-full py-3 rounded-full text-sm font-bold text-center text-orange-600 bg-orange-100 mt-4">Concluída ✓</div>
              : <button className="w-full py-3 rounded-full text-sm font-bold border border-gray-200 text-[#1b1b1b] hover:bg-gray-50 transition-colors mt-4">Iniciar Agora</button>
            }
          </div>

          {/* Card de Yoga */}
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
