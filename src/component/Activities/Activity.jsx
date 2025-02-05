import React, { useEffect, useState } from 'react'

import Createevent from '../Createevent/Createevent'
import Updateevent from '../Updateevent/Updateevent'
import Deleteevent from '../Deleteevent/Deleteevent'
import Apuntarextra from '../Apuntarextra/Apuntarextra'
import Getextra from '../Getextra/Getextra'
import './Activity.css'
import Calculaextra from '../Calculaextra/Calculaextra'
import Getproduct from '../Getproducts/Getproduct'
import Getcategory from '../Getproductbycategoria/Getcategory'
import Updateproduct from '../Updateproduct/Updateproduct'
import Deleteproduct from '../Deleteproduct/Deleteproduct'
import Createproduct from '../Createproduct/Createproduct'
import Updatestaff from '../Updatestaff/Updatestaff'
import Deletestaff from '../Deletestaff/Deletestaff'
import Createhorario from '../Createhorario/Createhorario'
import Updatehorario from '../Updatehorario/Updatehorario'
import Gethorario from '../Gethorario/Gethorario'
const Activity = () => {
  const [staff, setStaff] = useState(
    JSON.parse(localStorage.getItem('staff')) || { name: '', role: '' }
  )
  const [showForm, setShowForm] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [updateevent, setupdateevent] = useState(false)
  const [deleteevent, setdeleteevent] = useState(false)
  const [ApuntarExtra, SetapuntarExtra] = useState(false)
  const [getextra, setgetexta] = useState(false)
  const [calculaextra, setcalculaextra] = useState(false)
  const [getproducts, setgetproducts] = useState(false)
  const [getproductsbycategory, setgetproductsbycategory] = useState(false)
  const [updateproduct, setupdateproduct] = useState(false)
  const [deleteproduct, setdeleteproduct] = useState(false)
  const [createproduct, setcreateproduct] = useState(false)
  const [staffupdate, setstaffupdate] = useState(false)
  const [deletestaff, setdeletestaff] = useState(false)
  const [createhorario, setcreatehorario] = useState(false)
  const [updatehorario, setupdatehorario] = useState(false)
  const [gethorario, setgethorario] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleCreateEventClick = () => {
    console.log('Create Event button clicked')
    setShowCreateEvent(true)
  }
  const handleUpdateEventClick = () => {
    setupdateevent(true)
  }
  const handledeleteevent = () => {
    setdeleteevent(true)
  }
  const handleBackClick = () => {
    setShowCreateEvent(false)
  }
  const handleapuntarextra = () => {
    SetapuntarExtra(true)
  }
  const handlegetextra = () => {
    setgetexta(true)
  }
  const handlegetproducts = () => {
    setgetproducts(true)
  }
  const handlecalculaExtra = () => {
    setcalculaextra(true)
  }
  const handleproductsbycategory = () => {
    setgetproductsbycategory(true)
  }
  const handleupdateproduct = () => {
    setupdateproduct(true)
  }
  const handledeleteproduct = () => {
    setdeleteproduct(true)
  }
  const handleCreateproduct = () => {
    setcreateproduct(true)
  }
  const handlestaffupdate = () => {
    setstaffupdate(true)
  }
  const handledeletestaff = () => {
    setdeletestaff(true)
  }
  const handlecreatehorario = () => {
    setcreatehorario(true)
  }
  const handleupdatehorario = () => {
    setupdatehorario(true)
  }
  const handlegethorario = () => {
    setgethorario(true)
  }
  const renderButtons = () => {
    if (!staff || !staff.role) {
      return <p>Invalid staff information</p>
    }

    switch (staff.role.toLowerCase()) {
      case 'chef ejucutivo':
        return (
          <div className='buttons-container'>
            <button onClick={handlegetproducts}>Get Products</button>
            <button onClick={handleproductsbycategory}>
              Products by Category
            </button>
            <button onClick={handleCreateproduct}>Createproduct</button>
            <button onClick={handleupdateproduct}>Update Product</button>
            <button onClick={handledeleteproduct}>Delete Product</button>
            <button onClick={handlegethorario}>Ver Horario</button>
            <button onClick={handlecreatehorario}>Create Horario</button>
            <button onClick={handlegetextra}>Get Extra</button>
            <button onClick={handleapuntarextra}>Apuntar Extra</button>

            <button onClick={handleupdatehorario}>Update Horario</button>
            <button onClick={handlecalculaExtra}>Calcula Extra Month</button>
          </div>
        )
      case 'jefe de sala':
        return (
          <div className='buttons-container'>
            <button onClick={handlegethorario}>Ver Horario</button>
            <button onClick={handlecreatehorario}>Create Horario</button>
            <button onClick={handlegetextra}>Get Extra</button>
            <button onClick={handleapuntarextra}>Apuntar Extra</button>
            <button onClick={handleupdatehorario}>Update Horario</button>
            <button onClick={handlecalculaExtra}>Calcula Extra Month</button>
          </div>
        )
      case 'administrador':
        return (
          <div className='buttons-container'>
            <button onClick={handlegetproducts}>Get Products</button>
            <button onClick={handleproductsbycategory}>
              Products by Category
            </button>
            <button onClick={handlestaffupdate}>Update Staff Role</button>
            <button onClick={handledeletestaff}>Delete Staff</button>
            <button onClick={handlegetextra}>Get Extra</button>
            <button onClick={handleapuntarextra}>Apuntar Extra</button>

            <button onClick={handlecalculaExtra}>Calcula Extra Month</button>
          </div>
        )
      case 'event organizer':
        return (
          <div className='buttons-container'>
            <button onClick={handleCreateEventClick}>Create Events</button>
            <button onClick={handleUpdateEventClick}>Update Events</button>
            <button onClick={handledeleteevent}> Delete Events</button>
            <button onClick={handleapuntarextra}>Apuntar Extra</button>
            <button onClick={handlegetextra}>Get Extra</button>
            <button onClick={handlecalculaExtra}>Calcula extra month</button>
          </div>
        )
      default:
        return (
          <div className='buttons-container'>
            <button onClick={handlegethorario}>Ver Horario</button>
            <button onClick={handleapuntarextra}>Apuntar Extra</button>
            <button onClick={handlegetextra}>Get Extra</button>
            <button onClick={handlecalculaExtra}>Calcula Extra Month</button>
            <button onClick={handlegetproducts}>Get Products</button>
            <button onClick={handleproductsbycategory}>
              Get Products by Category
            </button>
          </div>
        )
    }
  }

  return (
    <div className='activity-container'>
      <div className='activitydiv'>
        {!showForm ? (
          <img
            className='loading_img'
            src='https://www.decoches.net/web/assets/custom/img/loading.gif'
            alt='loading'
          />
        ) : showCreateEvent ? (
          <>
            <Createevent />
          </>
        ) : updateevent ? (
          <>
            <Updateevent />
          </>
        ) : deleteevent ? (
          <>
            <Deleteevent />
          </>
        ) : ApuntarExtra ? (
          <>
            <Apuntarextra />
          </>
        ) : getextra ? (
          <>
            <Getextra />
          </>
        ) : calculaextra ? (
          <>
            <Calculaextra></Calculaextra>
          </>
        ) : getproducts ? (
          <>
            <Getproduct></Getproduct>
          </>
        ) : gethorario ? (
          <>
            <Gethorario />
          </>
        ) : staffupdate ? (
          <>
            <Updatestaff />
          </>
        ) : deletestaff ? (
          <>
            <Deletestaff />
          </>
        ) : getproductsbycategory ? (
          <>
            <Getcategory></Getcategory>
          </>
        ) : createhorario ? (
          <>
            <Createhorario></Createhorario>
          </>
        ) : updateproduct ? (
          <>
            <Updateproduct />
          </>
        ) : updatehorario ? (
          <>
            <Updatehorario></Updatehorario>
          </>
        ) : deleteproduct ? (
          <>
            <Deleteproduct />
          </>
        ) : createproduct ? (
          <>
            <Createproduct />
          </>
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
    </div>
  )
}

export default Activity
