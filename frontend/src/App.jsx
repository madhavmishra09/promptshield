import {Routes, Route} from 'react-router-dom'
import Home from "./pages/home"
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