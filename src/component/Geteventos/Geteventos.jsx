import React, { useEffect, useState } from 'react'
import Usefetch from '../customhook/Usefetch'
import './Getevent.css'

const Geteventos = () => {
  const { loading, data, fetchdata, error } = Usefetch()
  const [showevents, setshowevents] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowevents(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const endpoint = '/api/v1/eventos'
  const token = localStorage.getItem('token')
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    fetchdata(endpoint, options)
  }, [])

  const errorMessage =
    error === 'Error: 400'
      ? 'Cannot show any events only authorized persons can see the events'
      : 'Unknown error'

  return (
    <div className='getevents'>
      {!showevents && !error && (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      )}
      {showevents && (
        <div className='eventparticular'>
          {Array.isArray(data) &&
            data.map((event) => (
              <div key={event._id} className='eventimg'>
                <img src={event.eventimg} alt={event.title} />
                <div className='eventdes'>
                  <h1>title:{event.title}</h1>
                  <h2>date:{event.date.split('T')[0]}</h2>
                  <h3>pax:{event.Number_of_attendees}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
        </div>
      )}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <button
            onClick={() => {
              window.location.href = '/'
            }}
            className='goback'
          >
            Go back
          </button>
        </div>
      )}
    </div>
  )
}

export default Geteventos
