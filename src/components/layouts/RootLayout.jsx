import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router'
import FooterTop from '../FooterTop'

function RootLayout() {
  return (
    <>
        <Header/>
        <Outlet/>
        <FooterTop />
        <Footer/>
    </>
  )
}

export default RootLayout