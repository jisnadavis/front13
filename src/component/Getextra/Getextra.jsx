import { useState, useEffect } from 'react'
import Usefetch from '../customhook/Usefetch'
import './Getextra.css'

const GetExtra = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [filteredExtraHours, setFilteredExtraHours] = useState([])
  const [selectedExtra, setSelectedExtra] = useState(null)
  const [updatedHours, setUpdatedHours] = useState('')
  const [updatedLugar, setUpdatedLugar] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [clicked, setclicked] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const staff = JSON.parse(localStorage.getItem('staff'))
  const staffId = staff?._id || ''

  console.log('🆔 Staff ID:', staffId)

  const { data, error, loading, fetchdata } = Usefetch()

  useEffect(() => {
    if (staffId) {
      fetchdata(`/api/v1/extrahour/${staffId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    setclicked(true)
  }, [staffId])

  const handleShowExtraHours = () => {
    if (selectedDate && Array.isArray(data?.extraHours)) {
      const selectedDateObj = new Date(selectedDate).getTime()

      const filtered = data.extraHours.filter((extra) => {
        const extraDate = new Date(extra.fecha).getTime()
        return extraDate <= selectedDateObj
      })

      setFilteredExtraHours(filtered)
    } else {
      setFilteredExtraHours([])
    }
  }

  const handleSelectExtra = (extra) => {
    setSelectedExtra(extra)
    setUpdatedHours(extra.hours)
    setUpdatedLugar(extra.lugar)
  }

  const handleUpdateExtra = async () => {
    if (!selectedExtra) return

    console.log('Selected Extra ID:', selectedExtra._id)
    console.log('Token:', localStorage.getItem('token'))

    const updatedData = {
      hours: Number(updatedHours),
      lugar: updatedLugar.trim()
    }

    try {
      const response = await fetch(
        `https://proyecto13-q8hn.vercel.app/api/v1/extrahour/${selectedExtra._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updatedData)
        }
      )

      console.log('Response Status:', response.status)
      const responseText = await response.text()
      console.log('Response Text:', responseText)
      if (!response.ok) {
        throw new Error(responseText || 'Failed to update extra hour')
      }

      const responseData = JSON.parse(responseText)
      console.log('Updated extra hour:', responseData.extrahour)

      const updatedExtra = responseData.extrahour
      setFilteredExtraHours((prevState) =>
        prevState.map((extra) =>
          extra._id === updatedExtra._id ? updatedExtra : extra
        )
      )

      alert('Extra hour updated successfully')
      setSelectedExtra(null)
    } catch (error) {
      console.error('Update failed:', error)
      alert(error.message)
    }
  }

  useEffect(() => {
    if (error) {
      setErrorMessage(
        error.includes('403')
          ? 'You are not authorized to see the record.'
          : error.includes('404')
          ? 'Extra hour record not found.'
          : error
      )
    } else {
      setErrorMessage('')
    }
  }, [error])

  return (
    <div className='selectdate'>
      {!loading && !selectedExtra && (
        <div className='selectdate1'>
          <h2>Select a Start Date to View Extra Hours</h2>
          <input
            type='date'
            value={selectedDate}
            max={today}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setErrorMessage('')
            }}
          />
          <button
            onClick={handleShowExtraHours}
            disabled={!selectedDate}
            className='general'
          >
            Show Extra Hours
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {errorMessage && !loading && !clicked && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}

      {filteredExtraHours.length > 0 && !selectedExtra && (
        <div className='selectdate2'>
          {filteredExtraHours.map((extra) => (
            <div key={extra._id} className='extra-hour-item'>
              <h3>
                <strong>{new Date(extra.fecha).toLocaleDateString()}</strong> -{' '}
                {extra.hours} hours at {extra.lugar}
              </h3>
              <button onClick={() => handleSelectExtra(extra)}>Update</button>
            </div>
          ))}
        </div>
      )}

      {filteredExtraHours.length === 0 &&
        selectedDate &&
        !loading &&
        clicked && <p>No extra hours found for this date range.</p>}

      {selectedExtra && (
        <div className='updateform'>
          <h2>Update Extra Hour</h2>
          <p>
            <strong>Date:</strong>{' '}
            {new Date(selectedExtra.fecha).toLocaleDateString()}
          </p>
          <label>
            Hours:
            <input
              type='number'
              value={updatedHours}
              onChange={(e) => setUpdatedHours(e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type='text'
              value={updatedLugar}
              onChange={(e) => setUpdatedLugar(e.target.value)}
            />
          </label>
          <button
            onClick={handleUpdateExtra}
            className='general
          '
          >
            Update
          </button>
          <button onClick={() => setSelectedExtra(null)} className='general'>
            Back
          </button>
        </div>
      )}
    </div>
  )
}

export default GetExtra
