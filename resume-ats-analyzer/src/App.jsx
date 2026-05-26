import './App.css'
import Admin from './component/Admin/Admin'
import DashBoard from './component/Dashboard/DashBoard'
import History from './component/History/History'
import Login from './component/Login/Login'
import SideBar from './component/SideBar/SideBar'
import ChatBot from "./pages/ChatBot/ChatBot";

import { Routes, Route, useLocation } from 'react-router-dom'

function App() {

  const location = useLocation();

  return (
    <div className='outerbox'>

      {/* Login page lo sidebar hide */}
      {location.pathname !== "/" && <SideBar />}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/history' element={<History />} />
        <Route path='/chatbot' element={<ChatBot />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>

    </div>
  )
}

export default App