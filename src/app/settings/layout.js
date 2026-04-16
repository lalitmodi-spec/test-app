import React from 'react'
import SettingSideBar from './components/SettingSideBar'

const RootLayout = ({ children }) => {
  return (
    <div>
      <SettingSideBar />
      {children}    
    </div>
  )
}

export default RootLayout
