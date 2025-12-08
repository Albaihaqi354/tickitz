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
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/signIn' element={<SignIn/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/viewAll' element={<HomeView/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
    </Routes>
  )
}

export default Router
