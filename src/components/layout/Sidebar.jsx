import { NavLink } from 'react-router-dom'
import { useAvatar } from '../../context/AvatarContext'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home', icon: 'bi-house-fill' },
  { to: '/missoes', label: 'Missões', icon: 'bi-lightning-fill' },
  { to: '/loja', label: 'Loja', icon: 'bi-bag-fill' },
  { to: '/perfil', label: 'Perfil', icon: 'bi-person-fill' },
]

export default function Sidebar() {
  const { avatar } = useAvatar()
  const { user, logout } = useAuth()
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 sticky top-0 h-screen">
      {/* Logotipo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200 dark:border-slate-700">
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
        >
          <i className="bi bi-leaf-fill text-white text-sm" />
        </div>
        <div>
          <span className="font-extrabold text-lg text-[#1b1b1b] dark:text-slate-100">CareFit+</span>
          <div className="text-xs text-gray-400 dark:text-slate-500 -mt-0.5">THE LIVING SANCTUARY</div>
        </div>
      </div>

      {/* Links de navegação */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#e8f5e9] text-[#2e7d32] dark:bg-green-900/30 dark:text-green-400'
                  : 'text-[#495057] hover:bg-[#f1f8f1] hover:text-[#2e7d32] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-green-400'
              }`
            }
          >
            <i className={`bi ${icon} text-base`} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Widget do perfil */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-[#f4f6f4] dark:bg-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-full object-cover"
            style={{ width: 32, height: 32, border: '2px solid #66bb6a' }}
          />
          <div>
            <div className="text-sm font-bold text-[#1b1b1b] dark:text-slate-100">{user?.nome || 'Usuário'}</div>
            <div className="text-xs text-gray-400 dark:text-slate-500">Nível 12 · Guerreiro</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 dark:text-slate-500 flex justify-between mb-1">
          <span>XP</span><span>740 / 1000</span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: 10, background: '#334155' }}>
          <div className="h-full rounded-full" style={{ width: '74%', background: 'linear-gradient(90deg, #2e7d32, #a5d6a7)' }} />
        </div>
        <button
          onClick={logout}
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-semibold text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <i className="bi bi-box-arrow-right" /> Sair
        </button>
      </div>
    </aside>
  )
}
