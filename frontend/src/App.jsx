import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import CreateWebsite from './pages/CreateWebsite'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Directory from './pages/Directory'
import EditWebsite from './pages/EditWebsite'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-website" element={<CreateWebsite />} />
        <Route path="/edit-website/:id" element={<EditWebsite />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  )
}

export default App
