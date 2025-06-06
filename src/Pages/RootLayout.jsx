import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'

const RootLayout = () => {
  return (
    <>
   <Navbar/>
   <Outlet/>
   <Footer/>
    </>
  )
}

export default RootLayout