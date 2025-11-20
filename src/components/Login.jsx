import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, Mail, Lock } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      onLogin(email.split('@')[0] || 'Voter')
      setLoading(false)
    }, 900)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950" />
      {/* spotlight */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[50rem] h-[50rem] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[50rem] h-[50rem] rounded-full bg-blue-500/20 blur-3xl" />

      {/* decorative animated shapes */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute left-10 top-10 w-20 h-20 rounded-xl bg-indigo-500/20"
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-10 bottom-24 w-24 h-24 rounded-full bg-blue-500/20"
          animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <LogIn className="w-6 h-6" />
            </div>
            <h2 className="text-white text-2xl font-semibold">Election Portal</h2>
          </div>

          <p className="text-blue-200/80 text-sm mb-6">
            Sign in to cast your vote. Your choice remains private and secure.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-blue-200/70">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-blue-200/70">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium shadow-lg shadow-indigo-600/20"
            >
              {loading ? 'Checking…' : 'Sign in to Vote'}
            </motion.button>
          </form>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-center text-blue-200/80 text-sm"
              >
                Preparing your ballot…
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
