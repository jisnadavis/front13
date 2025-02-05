import React, { useEffect, useState } from 'react'
import Usefetch from '../customhook/Usefetch'
import './Deletestaff.css'

const Deletestaff = () => {
  const { loading, data, fetchdata, error } = Usefetch()
  const [isDeleting, setIsDeleting] = useState(false)

  const endpoint = '/api/v1/staffs'
  const token = localStorage.getItem('token')

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    fetchdata(endpoint, options)
  }, [])

  const handleDelete = async (staffId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this staff member?'
    )
    if (!confirmDelete) return

    setIsDeleting(true)

    const deleteEndpoint = `/api/v1/staffs/${staffId}`
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await fetchdata(deleteEndpoint, deleteOptions)

    if (!error) {
      alert('Staff deleted successfully!')
      fetchdata(endpoint, options)
    } else {
      alert('Failed to delete staff')
    }

    setIsDeleting(false)
  }

  return (
    <div className='delete-staff'>
      <h1>Delete Staff</h1>
      {loading && <p>Loading staff...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div className='staff-list'>
        {Array.isArray(data) &&
          data.map((staff) => (
            <div key={staff._id} className='staff-item'>
              <h2>
                {staff.name} {staff.apellidos}
              </h2>
              <button
                onClick={() => handleDelete(staff._id)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Deletestaff
