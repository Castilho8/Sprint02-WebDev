import Sidebar from './Sidebar'
import MobileNavbar from './MobileNavbar'

export default function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f5] dark:bg-[#0f172a]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <MobileNavbar />
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
        <footer className="flex items-center justify-between text-xs text-gray-400 dark:text-slate-500 py-4 px-6 border-t border-gray-200 dark:border-slate-700">
          <p>© 2026 CareFit+ Wellness. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#2e7d32] dark:hover:text-green-400">Política de Privacidade</a>
            <a href="#" className="hover:text-[#2e7d32] dark:hover:text-green-400">Conformidade LGPD</a>
            <a href="#" className="hover:text-[#2e7d32] dark:hover:text-green-400">Termos de Serviço</a>
            <a href="#" className="hover:text-[#2e7d32] dark:hover:text-green-400">Suporte</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
