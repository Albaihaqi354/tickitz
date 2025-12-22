import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../HeaderAdmin'
import Footer from '../Footer'

function AdminLayout() {
  return (
    <>  
        <HeaderAdmin/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default AdminLayout