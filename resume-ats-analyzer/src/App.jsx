import './App.css'
import Admin from './component/Admin/Admin'
import DashBoard from './component/Dashboard/DashBoard'
import History from './component/History/History'
import Login from './component/Login/Login'
import SideBar from './component/SideBar/SideBar'
import ChatBot from "./component/ChatBot/ChatBot";

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='outerbox'>
      
      <SideBar />

      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          path='/dashboard'
          element={<DashBoard />}
        />

        <Route
          path='/history'
          element={<History />}
        />

        <Route
          path='/admin'
          element={<Admin />}
        />

        {/* ChatBot Route */}
        <Route
          path='/chatbot'
          element={<ChatBot />}
        />

      </Routes>

    </div>
  )
}

export default App