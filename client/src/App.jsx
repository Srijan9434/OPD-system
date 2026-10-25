import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/user/Home'
import Doctors from './pages/user/Doctors'
import Appointment from './pages/user/Appointment'
import Login from './pages/user/Login'
import MyAppointments from './pages/user/MyAppointments'

export default function App() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
      <Footer />
    </div>
  )
}