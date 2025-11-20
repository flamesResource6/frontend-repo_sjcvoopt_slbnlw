import { useState } from 'react'
import Login from './components/Login'
import VoteScene from './components/VoteScene'

function App() {
  const [voter, setVoter] = useState(null)

  return (
    <div className="min-h-screen">
      {voter ? (
        <VoteScene voter={voter} onReset={() => setVoter(null)} />
      ) : (
        <Login onLogin={(name) => setVoter(name)} />
      )}
    </div>
  )
}

export default App
