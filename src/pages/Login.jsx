import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ nome: '', email: '', empresa: '' })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.nome.trim()) errs.nome = 'Informe seu nome completo.'
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Informe um e-mail válido.'
    if (Object.keys(errs).length) { setErrors(errs); return }
    login({ nome: form.nome.trim(), email: form.email.trim(), empresa: form.empresa.trim() })
  }

  const inputClass = (field) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 transition-colors ${
      errors[field]
        ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
        : 'border-gray-200 dark:border-slate-600'
    }`

  return (
    <div className="min-h-screen flex">

      {/* Painel esquerdo — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] p-10"
        style={{ background: 'linear-gradient(160deg, #1b5e20 0%, #2e7d32 55%, #43a047 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 42, height: 42, background: 'rgba(255,255,255,0.2)' }}
          >
            <i className="bi bi-leaf-fill text-white text-xl" />
          </div>
          <div>
            <div className="font-extrabold text-xl text-white leading-none">CareFit+</div>
            <div className="text-xs text-white/50 tracking-widest">THE LIVING SANCTUARY</div>
          </div>
        </div>

        {/* Headline + features */}
        <div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-3">
            Seu bem-estar<br />começa aqui.
          </h1>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Missões diárias, monitoramento de saúde e recompensas por hábitos saudáveis — tudo em um lugar.
          </p>
          <div className="flex flex-col gap-3">
            {[
              'Missões diárias personalizadas',
              'Monitoramento preventivo de saúde',
              'Recompensas por hábitos saudáveis',
              'Acompanhamento de bem-estar mental',
            ].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{ width: 22, height: 22, background: 'rgba(255,255,255,0.2)' }}
                >
                  <i className="bi bi-check-lg text-white text-xs" />
                </div>
                <span className="text-white/85 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/35 text-xs">© 2026 CareFit+ Wellness. Todos os direitos reservados.</p>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f5f5f5] dark:bg-slate-900 p-6">

        {/* Logo mobile */}
        <div className="flex lg:hidden items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
          >
            <i className="bi bi-leaf-fill text-white" />
          </div>
          <div>
            <div className="font-extrabold text-xl text-[#1b1b1b] dark:text-slate-100 leading-none">CareFit+</div>
            <div className="text-xs text-gray-400 dark:text-slate-500 tracking-widest">THE LIVING SANCTUARY</div>
          </div>
        </div>

        {/* Card do formulário */}
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-8">
          <h2 className="text-2xl font-extrabold text-[#1b1b1b] dark:text-slate-100 mb-1">
            Bem-vindo(a)!
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
            Preencha seus dados para começar sua jornada.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nome */}
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-slate-400 mb-1 block">
                Nome completo <span className="text-red-400">*</span>
              </label>
              <input
                className={inputClass('nome')}
                placeholder="Ex: Ana Silva"
                value={form.nome}
                onChange={set('nome')}
                autoFocus
              />
              {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-slate-400 mb-1 block">
                E-mail <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                className={inputClass('email')}
                placeholder="Ex: ana@empresa.com.br"
                value={form.email}
                onChange={set('email')}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Empresa */}
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-slate-400 mb-1 block">
                Empresa <span className="text-gray-300 dark:text-slate-600 font-normal">(opcional)</span>
              </label>
              <input
                className={inputClass('empresa')}
                placeholder="Ex: TechCorp Soluções Ltda."
                value={form.empresa}
                onChange={set('empresa')}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-sm font-bold text-white mt-1 hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #2e7d32, #66bb6a)' }}
            >
              Começar jornada <i className="bi bi-arrow-right ms-1" />
            </button>

          </form>

          <p className="text-xs text-gray-400 dark:text-slate-500 text-center mt-5 flex items-center justify-center gap-1">
            <i className="bi bi-shield-lock-fill text-[#2e7d32]" />
            Seus dados ficam salvos apenas no seu dispositivo.
          </p>
        </div>
      </div>

    </div>
  )
}
