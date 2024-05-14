import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Instructions from './pages/Instructions'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import { Route,Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<Instructions/>} path='/'/>
      <Route element={<Quiz/>} path='quiz'/>
    </Routes>
  )
}

export default App
