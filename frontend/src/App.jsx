import {Routes, Route} from 'react-router-dom'
import Home from "./pages/home"
import Dashboard from "./pages/dashboard"
import Logs from "./pages/logs"
import './App.css'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App;