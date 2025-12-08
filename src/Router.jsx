import React from 'react'
import { Routes,Route } from 'react-router'
import SignIn from './pages/SignIn'
import SignUp from './pages/signUp'
import Home from './pages/Home'
import HomeView from './pages/HomeView'
import Detail from './pages/Details'


function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth/signUp' element={<SignUp/>}></Route>
        <Route path='/auth/signIn' element={<SignIn/>}></Route>
        <Route path='/movies' element={<HomeView/>}></Route>
        <Route path='/movies/:id' element={<Detail/>}></Route>
    </Routes>
  )
}

export default Router
