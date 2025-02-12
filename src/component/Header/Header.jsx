import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token')
      setIsAuthenticated(!!token)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const toggleMenu = () => {
    setOpen(!open)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('staff')
    window.location.href = '/'
    setIsAuthenticated(false)
    closeMenu()
  }
  const handleactivity = () => {
    window.location.href = '/activity'
    closeMenu()
  }
  return (
    <div>
      <header>
        <img
          src='./assets/circuito-del-jarama.jpg'
          alt='menu_home'
          className='logo'
        />

        <nav className={open ? 'menuvertical' : 'nodisplay'}>
          <ul>
            <li>
              <NavLink to='/' activeclassname='active' onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/Events'
                activeclassname='active'
                onClick={closeMenu}
              >
                Events
              </NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <>
                  <div className='buttondiv'>
                    <button className='activity' onClick={handleLogout}>
                      Logout
                    </button>
                    <button className='activity' onClick={handleactivity}>
                      activity
                    </button>
                  </div>
                </>
              ) : (
                <NavLink
                  to='/login'
                  activeclassname='active'
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              )}
            </li>
            {!isAuthenticated && (
              <li>
                <NavLink
                  to='/register'
                  activeclassname='active'
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <img
          src='https://w7.pngwing.com/pngs/639/1013/png-transparent-hamburger-button-computer-icons-drop-down-list-fast-food-menu-rectangle-share-icon-pancake.png'
          className='menudesplagble'
          onClick={toggleMenu}
        />
      </header>
    </div>
  )
}
