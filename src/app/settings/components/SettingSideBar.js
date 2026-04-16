import Link from 'next/link'
import React from 'react'

const SettingSideBar = () => {
  return (
    <div>
      <h1>Setting SideBar</h1>
      <ul>
        <li><Link href="/settings/about">About</Link></li>
        <li><Link href="/settings/privacy">Privacy</Link></li>
        <li><Link href="/settings/security">Security</Link></li>
      </ul>
    </div>
  )
}

export default SettingSideBar
