export default function TopBar({ title }) {
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
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#2e7d32] transition-colors">
          <i className="bi bi-bell" />
        </button>
      </div>
    </div>
  )
}
