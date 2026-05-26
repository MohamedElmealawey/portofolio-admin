import { useState } from 'react'
import './App.css'
import {Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import AddWork from './pages/AddWork'
import ContactList from './pages/ContactList'
import SideBar from './components/SideBar'
import WorkList from './pages/WorkList'
import Login from './pages/Login'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'

function App() {

  const {token}=useContext(AdminContext);

  return (
    <>
      {token && token ? (
        <>
        <SideBar/>
        <div className='main'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/addWork' element={<AddWork/>}/>
            <Route path='/contactList' element={<ContactList/>}/>
            <Route path='/workList' element={<WorkList/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
        </>
      ):(<Login/>)}
    </>
  )
}

export default App
