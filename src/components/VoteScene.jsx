import { motion, AnimatePresence } from 'framer-motion'
import { Check, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const candidatesSeed = [
  { id: 'c1', name: 'Ava Patel', party: 'Unity Party', color: 'bg-indigo-600' },
  { id: 'c2', name: 'Liam Chen', party: 'Forward Now', color: 'bg-emerald-600' },
  { id: 'c3', name: 'Maya Rivera', party: 'People First', color: 'bg-rose-600' },
]

export default function VoteScene({ voter, onReset }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [candidates] = useState(candidatesSeed)

  useEffect(() => {
    setSelected(null)
    setSubmitted(false)
  }, [voter])

  const castVote = () => {
    if (!selected) return
    setSubmitted(true)
    setTimeout(() => {
      // show a confetti-like pulse via state; no external deps
    }, 800)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-indigo-500/10 blur-3xl" />

      {/* header */}
      <div className="absolute top-6 inset-x-0 flex items-center justify-center">
        <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-blue-100 text-sm flex items-center gap-2">
          <Users className="w-4 h-4" />
          Welcome, {voter}! Cast your vote.
        </div>
      </div>

      {/* person + ballot box scene */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center p-6 w-full max-w-6xl">
        {/* Stylized voter illustration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative hidden lg:block"
        >
          {/* Ground shadow */}
          <motion.div
            layout
            className="absolute -bottom-6 left-6 right-6 h-6 bg-black/30 blur-2xl rounded-full"
          />
          {/* Body */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-72 h-96 mx-auto relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-600 to-indigo-700" />
            {/* Head */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-amber-200" />
            {/* Face */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-black/20 rounded-full" />
            {/* Arm holding ballot */}
            <motion.div
              animate={{ rotate: submitted ? 40 : [10, 14, 10] }}
              transition={{ duration: 0.6, repeat: submitted ? 0 : Infinity, ease: 'easeInOut' }}
              className="absolute top-24 -right-6 origin-top-left"
            >
              <div className="w-40 h-8 bg-indigo-800 rounded-xl" />
              {/* Ballot */}
              <motion.div
                initial={false}
                animate={{ y: submitted ? 90 : 0, rotate: submitted ? -15 : 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute -bottom-6 right-2 w-16 h-12 bg-white rounded-md shadow"
              >
                <div className="w-10 h-2 bg-indigo-500 mt-2 ml-3 rounded" />
                <div className="w-8 h-2 bg-slate-200 mt-2 ml-3 rounded" />
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Ballot box */}
          <div className="mt-12 flex justify-center">
            <div className="relative w-56 h-40">
              <div className="absolute inset-0 bg-slate-800 rounded-xl border border-white/10" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-2 bg-black/60 rounded" />
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-12 bg-white rounded-md shadow"
                  >
                    <div className="w-10 h-2 bg-indigo-500 mt-2 ml-3 rounded" />
                    <div className="w-8 h-2 bg-slate-200 mt-2 ml-3 rounded" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Ballot list */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
        >
          <h3 className="text-white text-xl font-semibold mb-4">Select your candidate</h3>
          <div className="space-y-3">
            {candidates.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selected?.id === c.id
                    ? 'bg-white/10 border-indigo-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-12 rounded ${c.color}`} />
                  <div>
                    <div className="text-white font-medium">{c.name}</div>
                    <div className="text-blue-200/80 text-sm">{c.party}</div>
                  </div>
                  <div className="ml-auto">
                    {selected?.id === c.id && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={castVote}
              disabled={!selected || submitted}
              className="px-4 py-2 rounded-lg bg-indigo-600 disabled:bg-indigo-600/40 text-white shadow"
            >
              Cast Vote
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg bg-white/10 text-blue-100 border border-white/10"
            >
              Switch account
            </button>
          </div>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-emerald-300 text-sm"
              >
                Vote recorded securely. Thank you for participating!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
