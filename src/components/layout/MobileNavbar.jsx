import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', icon: 'bi-house-fill' },
  { to: '/missoes', label: 'Missões', icon: 'bi-lightning-fill' },
  { to: '/loja', label: 'Loja', icon: 'bi-bag-fill' },
  { to: '/perfil', label: 'Perfil', icon: 'bi-person-fill' },
]

export default function MobileNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
          >
            <i className="bi bi-leaf-fill text-white text-sm" />
          </div>
          <span className="font-extrabold text-[#1b1b1b] text-lg">CareFit+</span>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-[#2e7d32] text-2xl border-0 bg-transparent focus:outline-none"
        >
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 px-3 pb-3 border-t border-gray-100">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
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
      )}

      {open && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  )
}
