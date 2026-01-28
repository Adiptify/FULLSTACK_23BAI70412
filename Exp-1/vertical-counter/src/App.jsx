import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="interface-container">
      <div className="display-value">
        {count}
      </div>

      <button
        className="counter-btn"
        onClick={() => setCount(prev => prev + 1)}
      >
        +
      </button>

      <button
        className="counter-btn"
        onClick={() => setCount(prev => prev - 1)}
      >
        −
      </button>
    </div>
  )
}

export default App
