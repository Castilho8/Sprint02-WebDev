import { useState } from 'react'
import TopBar from '../components/ui/TopBar'
import Modal from '../components/ui/Modal'
import { useTheme } from '../context/ThemeContext'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'digital', label: 'Digital', icon: 'bi-phone-fill' },
  { id: 'fisico', label: 'Físico', icon: 'bi-box-fill' },
  { id: 'saude', label: 'Saúde', icon: 'bi-heart-pulse-fill' },
  { id: 'parceiro', label: 'Parceiros', icon: 'bi-building-fill' },
]

const CAT_STYLE = {
  digital: 'bg-blue-50 text-blue-600 border-blue-200',
  fisico: 'bg-orange-50 text-orange-600 border-orange-200',
  saude: 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]',
  parceiro: 'bg-purple-50 text-purple-600 border-purple-200',
}

const REWARDS = [
  {
    id: 1, cat: 'digital', icon: 'bi-phone-fill', iconBg: '#e3f2fd', iconColor: '#1e88e5',
    title: 'Tema Exclusivo do App', desc: 'Personalize o tema "Floresta Viva"', cost: 200, available: true,
  },
  {
    id: 2, cat: 'saude', icon: 'bi-cup-hot-fill', iconBg: '#e8f5e9', iconColor: '#2e7d32',
    title: 'Kit Chás Medicinais', desc: '6 chás medicinais para bem-estar', cost: 350, available: true,
  },
  {
    id: 3, cat: 'parceiro', icon: 'bi-activity', iconBg: '#ede7f6', iconColor: '#7e57c2',
    title: 'Day Pass Academia', desc: 'Acesso por 1 dia à rede parceira', cost: 400, available: true,
  },
  {
    id: 4, cat: 'digital', icon: 'bi-headphones', iconBg: '#e3f2fd', iconColor: '#1e88e5',
    title: 'Meditações Premium', desc: '30 meditações exclusivas por 2 semanas', cost: 300, available: true,
  },
  {
    id: 5, cat: 'fisico', icon: 'bi-gift-fill', iconBg: '#fff3e0', iconColor: '#e65100',
    title: 'Kit Bem-estar', desc: 'Garrafa térmica + diário de hábitos + caneta', cost: 900, available: false,
  },
  {
    id: 6, cat: 'parceiro', icon: 'bi-fork-knife', iconBg: '#fce4ec', iconColor: '#c2185b',
    title: 'Voucher Restaurante Saudável', desc: 'R$30 de desconto em restaurantes parceiros', cost: 1200, available: false,
  },
]

const BALANCE = 840

function RewardCard({ reward, onRedeem }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all ${
        reward.available ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'opacity-70'
      }`}
    >
      <div
        className="flex items-center justify-center"
        style={{ height: 120, background: reward.iconBg }}
      >
        <i className={`bi ${reward.icon} text-5xl`} style={{ color: reward.iconColor }} />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${CAT_STYLE[reward.cat]}`}>
            {CATEGORIES.find(c => c.id === reward.cat)?.label}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
              reward.available ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {reward.cost} pts
          </span>
        </div>
        <div className="font-bold text-[#1b1b1b] mt-2">{reward.title}</div>
        <div className="text-xs text-gray-400 mt-0.5 mb-3">{reward.desc}</div>
        <button
          onClick={() => reward.available && onRedeem(reward)}
          disabled={!reward.available}
          className={`w-full py-2 rounded-full text-sm font-bold transition-colors ${
            reward.available
              ? 'bg-[#2e7d32] text-white hover:bg-[#1b5e20]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {reward.available ? 'Resgatar' : 'Saldo insuficiente'}
        </button>
      </div>
    </div>
  )
}

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [confirmModal, setConfirmModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [pending, setPending] = useState(null)
  const { dark } = useTheme()

  const openConfirm = (reward) => {
    setPending(reward)
    setConfirmModal(true)
  }

  const confirmRedeem = () => {
    setConfirmModal(false)
    setTimeout(() => setSuccessModal(true), 300)
  }

  const visible = REWARDS.filter(r => activeCategory === 'all' || r.cat === activeCategory)

  return (
    <div>
      <TopBar title="Loja" />

      {/* Saldo + Destaque */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Saldo */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{ background: 'linear-gradient(135deg, #2e7d32, #43a047)' }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Seu Saldo</div>
          <div className="text-5xl font-extrabold mb-0.5">{BALANCE}</div>
          <div className="text-sm opacity-75 mb-4">pontos disponíveis</div>
          <div className="border-t border-white/20 pt-3 grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-xs opacity-60 uppercase tracking-wider">Acumulados</div>
              <div className="font-bold text-lg">3.240 pts</div>
            </div>
            <div>
              <div className="text-xs opacity-60 uppercase tracking-wider">Resgatados</div>
              <div className="font-bold text-lg">2.400 pts</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-sm">
            <i className="bi bi-info-circle-fill mr-1" />
            Ganhe +120 pts completando as missões de hoje.
          </div>
        </div>

        {/* Destaque */}
        <div
          className="rounded-2xl p-5 border border-[#c8e6c9]"
          style={{ background: dark ? 'linear-gradient(135deg, #0d2211, #1a2e1a)' : 'linear-gradient(135deg, #f1f8e9, #e8f5e9)' }}
        >
          <div className="flex items-center gap-1 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-400 text-white">
              ⭐ Destaque da Semana
            </span>
          </div>
          <div className="flex items-center justify-center my-3">
            <i className="bi bi-person text-[#2e7d32]" style={{ fontSize: '5rem' }} />
          </div>
          <div className="font-extrabold text-[#1b1b1b] text-lg">Plano Premium — 1 Mês</div>
          <div className="text-xs text-gray-500 mt-1 mb-3">
            Acesso ilimitado a aulas ao vivo, meditações guiadas e conteúdo exclusivo por 30 dias.
          </div>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-sm font-extrabold bg-[#2e7d32] text-white">600 pts</span>
            <button
              onClick={() => openConfirm({ title: 'Plano Premium — 1 Mês', cost: 600, available: true })}
              className="px-4 py-2 rounded-full text-sm font-bold bg-[#2e7d32] text-white hover:bg-[#1b5e20] transition-colors"
            >
              Resgatar
            </button>
          </div>
        </div>
      </div>

      {/* Filtro de categorias */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              activeCategory === c.id
                ? 'bg-[#2e7d32] text-white border-[#2e7d32]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2e7d32] hover:text-[#2e7d32]'
            }`}
          >
            {c.icon && <i className={`bi ${c.icon}`} />}
            {c.label}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-extrabold text-[#1b1b1b] mb-4">Recompensas Disponíveis</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {visible.map(r => (
          <RewardCard key={r.id} reward={r} onRedeem={openConfirm} />
        ))}
        {visible.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-400">
            <i className="bi bi-bag text-4xl block mb-2" />
            <p>Nenhuma recompensa nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      <Modal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Confirmar resgate"
        footer={
          <>
            <button
              onClick={() => setConfirmModal(false)}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-500 hover:border-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmRedeem}
              className="px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
            >
              Confirmar
            </button>
          </>
        }
      >
        {pending && (
          <p className="text-sm text-gray-500">
            Você está prestes a resgatar <strong>{pending.title}</strong> por{' '}
            <strong className="text-[#2e7d32]">{pending.cost} pontos</strong>.
            Deseja confirmar?
          </p>
        )}
      </Modal>

      {/* Modal de sucesso */}
      <Modal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        title="Resgate realizado!"
      >
        <div className="text-center py-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: '#e8f5e9' }}
          >
            <i className="bi bi-check-circle-fill text-4xl text-[#2e7d32]" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            <strong>{pending?.title}</strong> foi resgatado com sucesso! Confira seu e-mail para mais detalhes.
          </p>
          <button
            onClick={() => setSuccessModal(false)}
            className="px-6 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
          >
            Ótimo!
          </button>
        </div>
      </Modal>
    </div>
  )
}
