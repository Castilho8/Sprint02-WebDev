import { useRef, useState } from 'react'
import TopBar from '../components/ui/TopBar'
import Modal from '../components/ui/Modal'
import { useAvatar } from '../context/AvatarContext'

const TABS = [
  { id: 'dados', label: 'Dados Pessoais' },
  { id: 'saude', label: 'Saúde' },
  { id: 'conquistas', label: 'Conquistas' },
  { id: 'privacidade', label: 'Privacidade & LGPD' },
]

const ACHIEVEMENTS = [
  { id: 1, icon: 'bi-leaf-fill', iconBg: '#e8f5e9', iconColor: '#2e7d32', title: 'Primeiro Passo', desc: 'Completou sua primeira missão', unlocked: true },
  { id: 2, icon: 'bi-fire', iconBg: '#fff3e0', iconColor: '#e65100', title: 'Sequência de 7 Dias', desc: 'Manteve uma sequência de 7 dias', unlocked: true },
  { id: 3, icon: 'bi-droplet-fill', iconBg: '#e3f2fd', iconColor: '#1e88e5', title: 'Hidratado!', desc: 'Missão de hidratação completa 10x', unlocked: true },
  { id: 4, icon: 'bi-peace-fill', iconBg: '#ede7f6', iconColor: '#7e57c2', title: 'Mente Clara', desc: 'Meditou 5 dias consecutivos', unlocked: true },
  { id: 5, icon: 'bi-trophy-fill', iconBg: '#f5f5f5', iconColor: '#9e9e9e', title: 'Mestre da Harmonia', desc: '18/30 dias perfeitos', progress: '18/30', unlocked: false },
  { id: 6, icon: 'bi-stars', iconBg: '#f5f5f5', iconColor: '#9e9e9e', title: 'Luz Interior Máxima', desc: 'Nível 6/10', progress: 'Nível 6/10', unlocked: false },
]

function TabPersonal({ editing, setEditing }) {
  const [form, setForm] = useState({
    nome: 'Bruno Silva',
    email: 'bruno.silva@empresa.com.br',
    telefone: '(11) 99876-5432',
    nascimento: '15 de março de 1990',
    empresa: 'TechCorp Soluções Ltda.',
  })
  const [saved, setSaved] = useState({ ...form })
  const [toast, setToast] = useState(false)

  const save = () => {
    setSaved({ ...form })
    setEditing(false)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const cancel = () => {
    setForm({ ...saved })
    setEditing(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Esquerda */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-[#1b1b1b] text-lg">Informações Pessoais</span>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold text-[#2e7d32] hover:bg-[#e8f5e9] transition-colors"
              >
                <i className="bi bi-pencil-fill" /> Editar
              </button>
            )}
          </div>

          {!editing ? (
            <div className="divide-y divide-gray-100">
              {[
                ['Nome Completo', saved.nome],
                ['E-mail', saved.email],
                ['Telefone', saved.telefone],
                ['Data de Nascimento', saved.nascimento],
                ['Empresa', saved.empresa],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-3">
                  <span className="text-sm text-gray-400 font-medium">{label}</span>
                  <span className="text-sm font-semibold text-[#1b1b1b]">{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[
                ['nome', 'Nome Completo'],
                ['email', 'E-mail'],
                ['telefone', 'Telefone'],
                ['nascimento', 'Data de Nascimento'],
                ['empresa', 'Empresa'],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-400 mb-1 block">{label}</label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]"
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={save}
                  className="px-5 py-2 rounded-full text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
                >
                  Salvar alterações
                </button>
                <button
                  onClick={cancel}
                  className="px-5 py-2 rounded-full text-sm font-bold border border-gray-200 text-gray-500 hover:border-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Direita */}
      <div className="flex flex-col gap-4">
        {/* Progresso de nível */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="font-bold text-[#1b1b1b] mb-1">Nível 12 · Guerreiro</div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>XP</span><span>740 / 1000</span>
          </div>
          <div className="w-full rounded-full overflow-hidden mb-2" style={{ height: 10, background: '#e0ede0' }}>
            <div className="h-full rounded-full" style={{ width: '74%', background: 'linear-gradient(90deg, #2e7d32, #a5d6a7)' }} />
          </div>
          <div className="text-xs text-gray-400">Faltam 260 XP para Nível 13 · Mestre</div>
          <div className="mt-3 bg-[#f4f6f4] rounded-xl p-3 flex items-center gap-2">
            <i className="bi bi-shield-fill-check text-[#2e7d32] text-lg" />
            <div>
              <div className="text-xs font-bold text-[#1b1b1b]">Nível 13 · Mestre</div>
              <div className="text-xs text-gray-400">Acesso a missões exclusivas</div>
            </div>
          </div>
        </div>

        {/* Integrações */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="font-bold text-[#1b1b1b] mb-3">Integrações</div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <i className="bi bi-heart-pulse-fill text-red-400" />
              <span className="text-sm font-medium text-[#1b1b1b]">Apple Health</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">Ativo</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bi bi-activity text-blue-400" />
              <span className="text-sm font-medium text-[#1b1b1b]">Google Fit</span>
            </div>
            <button className="px-3 py-1 rounded-full text-xs font-bold border border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] transition-colors">
              Conectar
            </button>
          </div>
        </div>
      </div>

      {/* Notificação */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white"
          style={{ background: '#2e7d32' }}
        >
          <i className="bi bi-check-circle-fill" /> Dados salvos com sucesso!
        </div>
      )}
    </div>
  )
}

function TabHealth() {
  const tags = [
    { label: 'Caminhada', color: 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]' },
    { label: 'Hidratação', color: 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]' },
    { label: 'Meditação', color: 'bg-[#e3f2fd] text-blue-600 border-blue-200' },
    { label: 'Leitura', color: 'bg-[#e3f2fd] text-blue-600 border-blue-200' },
    { label: 'Sono', color: 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]' },
    { label: 'Respiração', color: 'bg-red-50 text-red-600 border-red-200' },
  ]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <span className="font-bold text-[#1b1b1b] text-lg">Dados de Saúde</span>
        <div className="divide-y divide-gray-100 mt-3">
          {[
            ['Altura', '178 cm'],
            ['Peso', '74 kg'],
            ['IMC', '23.4 — Normal'],
            ['Nível de Atividade', 'Intermediário'],
            ['Objetivo Principal', 'Reduzir estresse e melhorar qualidade do sono'],
            ['Condições de Saúde', 'Nenhuma registrada'],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between py-3">
              <span className="text-sm text-gray-400 font-medium">{l}</span>
              <span className="text-sm font-semibold text-[#1b1b1b] text-right max-w-[60%]">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <span className="font-bold text-[#1b1b1b]">Preferências de Missões</span>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map(t => (
            <span key={t.label} className={`px-3 py-1 rounded-full text-xs font-bold border ${t.color}`}>
              {t.label}
            </span>
          ))}
        </div>
        <button className="mt-4 w-full py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-500 hover:border-[#2e7d32] hover:text-[#2e7d32] transition-colors">
          Editar preferências
        </button>
      </div>
    </div>
  )
}

function TabAchievements() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {ACHIEVEMENTS.map(a => (
        <div
          key={a.id}
          className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-3 transition-all ${
            !a.unlocked ? 'opacity-45' : 'hover:shadow-md'
          }`}
        >
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 56, height: 56, background: a.iconBg }}
          >
            <i className={`bi ${a.icon} text-2xl`} style={{ color: a.iconColor }} />
          </div>
          <div>
            <div className="font-bold text-[#1b1b1b]">{a.title}</div>
            <div className="text-xs text-gray-400 mt-0.5">{a.desc}</div>
            {a.progress && (
              <span className="mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
                {a.progress}
              </span>
            )}
            {a.unlocked && (
              <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#2e7d32]">
                <i className="bi bi-check-circle-fill" /> Desbloqueada
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function TabPrivacy({ onDeleteRequest }) {
  const [consents, setConsents] = useState({ saude: true, comunicacoes: true, analiticos: false })
  const toggle = key => setConsents(c => ({ ...c, [key]: !c[key] }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="font-bold text-[#1b1b1b] mb-3">Consentimento de Dados</div>
          {[
            ['saude', 'Dados de saúde e atividade', 'Necessário para personalizar missões'],
            ['comunicacoes', 'Comunicações e notificações', 'Envio de lembretes e atualizações'],
            ['analiticos', 'Dados analíticos', 'Melhoria do produto'],
          ].map(([k, label, sub]) => (
            <div key={k} className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-100">
              <div>
                <div className="text-sm font-semibold text-[#1b1b1b]">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
              <button
                onClick={() => toggle(k)}
                className={`relative w-12 h-6 rounded-full transition-colors ${consents[k] ? 'bg-[#2e7d32]' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${consents[k] ? 'translate-x-6' : ''}`}
                />
              </button>
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-3">
            Em conformidade com a LGPD (Lei nº 13.709/2018). Seus dados são protegidos.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="font-bold text-[#1b1b1b] mb-1">Seus Dados</div>
          <p className="text-xs text-gray-400 mb-3">Exporte uma cópia de todos os seus dados em até 48 horas.</p>
          <button className="px-4 py-2 rounded-full text-sm font-semibold border border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] transition-colors">
            Exportar meus dados
          </button>
        </div>

        <div className="rounded-2xl border border-red-200 p-5" style={{ background: '#fff5f5' }}>
          <div className="font-bold text-red-700 mb-1">Zona de Risco</div>
          <p className="text-xs text-red-500 mb-3">Esta ação é irreversível e excluirá permanentemente todos os seus dados.</p>
          <button
            onClick={onDeleteRequest}
            className="px-4 py-2 rounded-full text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Excluir minha conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('dados')
  const [editing, setEditing] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')
  const [deleteError, setDeleteError] = useState(false)
  const { avatar, updateAvatar } = useAvatar()
  const fileInputRef = useRef(null)

  function handleChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => updateAvatar(ev.target.result)
    reader.readAsDataURL(file)
  }

  const confirmDelete = () => {
    if (deleteInput.trim().toUpperCase() === 'CONFIRMAR') {
      setDeleteModal(false)
      setDeleteInput('')
      alert('Conta excluída (simulação).')
    } else {
      setDeleteError(true)
    }
  }

  return (
    <div>
      <TopBar title="Perfil" />

      {/* Cabeçalho do perfil */}
      <div
        className="rounded-2xl p-5 mb-5 border border-[#e0ede0]"
        style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="rounded-full object-cover"
              style={{ width: 88, height: 88, border: '3px solid #66bb6a', boxShadow: '0 0 0 4px #c8e6c9' }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#2e7d32] shadow-sm hover:bg-[#e8f5e9] transition-colors"
            >
              <i className="bi bi-camera-fill text-xs" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="font-extrabold text-2xl text-[#1b1b1b]">Bruno Silva</div>
            <span
              className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
            >
              Nível 12 · Guerreiro
            </span>
            <div className="text-xs text-gray-400 mt-2">bruno.silva@empresa.com.br · Membro desde Jan 2024</div>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold border border-[#a5d6a7] bg-[#e8f5e9] text-[#2e7d32]">Físico: Intermediário</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold border border-blue-200 bg-[#e3f2fd] text-blue-600">Mental: Iniciante</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold border border-orange-200 bg-[#fff3e0] text-orange-600">
                <i className="bi bi-fire" /> 12 dias de streak
              </span>
            </div>
          </div>
          <button
            onClick={() => { setActiveTab('dados'); setEditing(true) }}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] transition-colors"
          >
            <i className="bi bi-pencil-fill me-1" /> Editar Perfil
          </button>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: '840', label: 'Pontos atuais', color: 'text-[#2e7d32]', bg: '#e8f5e9' },
            { value: '47', label: 'Dias perfeitos', color: 'text-[#1b1b1b]', bg: 'white' },
            { value: '128', label: 'Missões concluídas', color: 'text-blue-600', bg: '#e3f2fd' },
            { value: '8', label: 'Conquistas', color: 'text-orange-600', bg: '#fff3e0' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Abas */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              activeTab === t.id
                ? 'bg-[#2e7d32] text-white border-[#2e7d32]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2e7d32] hover:text-[#2e7d32]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'dados' && <TabPersonal editing={editing} setEditing={setEditing} />}
      {activeTab === 'saude' && <TabHealth />}
      {activeTab === 'conquistas' && <TabAchievements />}
      {activeTab === 'privacidade' && <TabPrivacy onDeleteRequest={() => setDeleteModal(true)} />}

      {/* Modal de exclusão */}
      <Modal
        open={deleteModal}
        onClose={() => { setDeleteModal(false); setDeleteInput(''); setDeleteError(false) }}
        title="Excluir conta"
        footer={
          <>
            <button
              onClick={() => { setDeleteModal(false); setDeleteInput(''); setDeleteError(false) }}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-500 hover:border-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-full text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Confirmar exclusão
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-500 mb-3">
          Esta ação é irreversível. Digite <strong>CONFIRMAR</strong> para prosseguir.
        </p>
        <input
          className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-300 ${
            deleteError ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
          placeholder="CONFIRMAR"
          value={deleteInput}
          onChange={e => { setDeleteInput(e.target.value); setDeleteError(false) }}
        />
        {deleteError && <p className="text-xs text-red-500 mt-1">Digite exatamente "CONFIRMAR"</p>}
      </Modal>
    </div>
  )
}
