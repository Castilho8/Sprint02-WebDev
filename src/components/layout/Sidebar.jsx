import { NavLink } from 'react-router-dom'
import { useAvatar } from '../../context/AvatarContext'

const navLinks = [
  { to: '/', label: 'Home', icon: 'bi-house-fill' },
  { to: '/missoes', label: 'Missões', icon: 'bi-lightning-fill' },
  { to: '/loja', label: 'Loja', icon: 'bi-bag-fill' },
  { to: '/perfil', label: 'Perfil', icon: 'bi-person-fill' },
]

export default function Sidebar() {
  const { avatar } = useAvatar()

  return (
    <aside
      className="hidden lg:flex flex-col shrink-0 border-r border-[#e0ede0] sticky top-0 h-screen overflow-y-auto"
      style={{ width: 370, background: 'linear-gradient(180deg, #f9fdf9 0%, #fff 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-7 pb-5">
        <div
          className="flex items-center justify-center rounded-full shadow"
          style={{ width: 46, height: 46, background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
        >
          <i className="bi bi-leaf-fill text-white text-xl" />
        </div>
        <div>
          <div className="font-extrabold text-[1.25rem] text-[#1b1b1b] leading-tight tracking-tight">
            CareFit+
          </div>
          <div className="text-xs text-[#6c757d] tracking-widest uppercase font-medium">
            The Living Sanctuary
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-2 px-3 pt-4 flex-1">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-full font-semibold transition-colors ${
                isActive
                  ? 'bg-[#e8f5e9] text-[#2e7d32]'
                  : 'text-[#495057] hover:bg-[#f1f8f1] hover:text-[#2e7d32]'
              }`
            }
          >
            <i className={`bi ${icon} text-base`} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Profile widget */}
      <div
        className="mx-4 mb-5 rounded-2xl p-4"
        style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative shrink-0">
            <img
              src={avatar}
              alt="Avatar"
              className="rounded-full object-cover"
              style={{
                width: 52, height: 52,
                border: '3px solid #66bb6a',
                boxShadow: '0 0 0 3px #c8e6c9',
              }}
            />
          </div>
          <div>
            <div className="font-bold text-[#1b1b1b] leading-tight">Bruno Silva</div>
            <div className="text-sm text-[#2e7d32] font-semibold">Nível 12 · Guerreiro</div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-[#495057] mb-1 font-medium">
          <span>XP</span><span>740 / 1000</span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: 7, background: '#c8e6c9' }}>
          <div
            className="h-full rounded-full"
            style={{ width: '74%', background: 'linear-gradient(90deg, #43a047, #a5d6a7)' }}
          />
        </div>
      </div>
    </aside>
  )
}
