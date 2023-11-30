import React from 'react'
import Logo from "../assets/logo.png"

const Header = () => {
  return (
    <header>
        <div className='logo-page'>
            <img className='logo' src={Logo} alt='Logo'/>
            <span>UK Data Management</span>
        </div>
    </header>
  )
}

export default Header