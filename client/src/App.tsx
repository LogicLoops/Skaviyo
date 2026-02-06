import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {LoginPage, AdminDashboard, VendorDashboard} from './routes/routes'

function App() {


  return (
   <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
