'/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './component/Header/Header'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Activity from './component/Activities/Activity'
import Geteventos from './component/Geteventos/Geteventos'

function App() {
  return (
    <>
      <div>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/events' element={<Geteventos />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/activity' element={<Activity />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
