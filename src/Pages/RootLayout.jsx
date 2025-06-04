import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
   <Navbar/>
   <Outlet/>
    </>
  )
}

export default RootLayout