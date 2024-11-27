import React from 'react'
import { Toaster } from "../components/ui/toaster"
import Footer from '@/components/Footer'
import Navbar from '@/components/navBar'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
      </main>
      <Footer />
      {/* Add the Toaster component here */}
      <Toaster />
    </div>
  )
}

export default AppLayout
