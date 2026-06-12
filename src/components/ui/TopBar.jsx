import { useTheme } from '../../context/ThemeContext'

export default function TopBar({ title }) {
  const { dark, toggle } = useTheme()

  return (
    <div className="flex items-center justify-between mb-5">
      <h1 className="text-2xl font-bold text-green-700 m-0">{title}</h1>
      <div className="flex items-center gap-2">
        <span
          className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold"
          style={{ background: '#fff3e0', color: '#e65100' }}
        >
          <i className="bi bi-fire" /> 12 Dias
        </span>
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-300 hover:text-[#2e7d32] dark:hover:text-green-400 transition-colors"
          title={dark ? 'Modo claro' : 'Modo escuro'}
        >
          <i className={`bi ${dark ? 'bi-sun-fill' : 'bi-moon-fill'}`} />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-300 hover:text-[#2e7d32] dark:hover:text-green-400 transition-colors">
          <i className="bi bi-bell" />
        </button>
      </div>
    </div>
  )
}
