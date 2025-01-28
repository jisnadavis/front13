import React, { useEffect, useState } from 'react'
import './Activity.css'

const Activity = () => {
  const [staff, setStaff] = useState(
    JSON.parse(localStorage.getItem('staff')) || { name: '', role: '' }
  )
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const renderButtons = () => {
    if (!staff || !staff.role) {
      return <p>Invalid staff information</p>
    }

    switch (staff.role.toLowerCase()) {
      case 'chef ejucutivo':
        return (
          <div className='buttons-container'>
            <button>Get Products</button>
            <button>Products by Category</button>
            <button>Update Product</button>
            <button>Delete Product</button>
            <button>Ver Horario</button>
            <button>Create Horario</button>
            <button>Get Extra</button>
            <button>Apuntar Extra</button>
            <button>Update Extra</button>
            <button>Update Horario</button>
            <button>Calcula Extra Month</button>
          </div>
        )
      case 'jefe de sala':
        return (
          <div className='buttons-container'>
            <button>Ver Horario</button>
            <button>Create Horario</button>
            <button>Get Extra</button>
            <button>Apuntar Extra</button>
            <button>Update Extra</button>
            <button>Update Horario</button>
            <button>Calcula Extra Month</button>
          </div>
        )
      case 'administrador':
        return (
          <div className='buttons-container'>
            <button>Get Products</button>
            <button>Products by Category</button>
            <button>Update Staff Role</button>
            <button>Delete Staff</button>
            <button>Get Extra</button>
            <button>Apuntar Extra</button>
            <button>Update Extra</button>
            <button>Calcula Extra Month</button>
          </div>
        )
      case 'event organizer':
        return (
          <div className='buttons-container'>
            <button>Create Events</button>
            <button>Update Events</button>
            <button>Delete Events</button>
            <button>apuntar extra</button>
            <button>get extra</button>
            <button>update extra</button>
          </div>
        )
      default:
        return (
          <div className='buttons-container'>
            <button>Ver Horario</button>
            <button>Apuntar Extra</button>
            <button>Update Extra</button>
            <button>Get Extra</button>
            <button>Calcula Extra Month</button>
            <button>Get Products</button>
            <button>Get Products by Category</button>
          </div>
        )
    }
  }

  return (
    <div className='activity-container'>
      {!showForm ? (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      ) : (
        <>
          <div className='welcome-message'>
            <h1>
              {staff.name
                ? `Welcome to the Activity Page, ${staff.name}`
                : 'Welcome to the Activity Page'}
            </h1>
          </div>

          {renderButtons()}
        </>
      )}
    </div>
  )
}

export default Activity
