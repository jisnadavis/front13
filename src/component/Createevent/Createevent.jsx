import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Usefetch from '../customhook/Usefetch'
import './Createevent.css'

const Createevent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [showform, setShowform] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventImage, setEventImage] = useState(null)
  const { loading, error, fetchdata, data } = Usefetch()
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowform(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  const submitForm = async (formdata) => {
    const formattedDate = new Date(formdata.date).toISOString().split('T')[0]
    const payload = new FormData()
    payload.append('title', formdata.title)
    payload.append('date', formattedDate)
    payload.append('location', formdata.location)
    payload.append('description', formdata.description)
    payload.append('Number_of_attendees', formdata.Number_of_attendees)
    payload.append('eventorganizer', formdata.eventorganizer)
    if (eventImage) {
      payload.append('eventimg', eventImage)
    }
    console.log(formdata)
    const endpoint = '/api/v1/eventos/'
    const token = localStorage.getItem('token')
    const options = {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    setIsSubmitting(true)
    fetchdata(endpoint, options)
  }
  useEffect(() => {
    if (!loading && isSubmitting) {
      setIsSubmitting(false)
    }
  }, [loading, isSubmitting])
  const errorMessage =
    error === 'Error: 400'
      ? 'Invalid date format. Unable to create the event.'
      : error === 'Error: 403'
      ? 'You are not authorized to create the event.'
      : 'An unknown error occurred.'

  return (
    <div className='createevent'>
      {(!showform || isSubmitting) && (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      )}
      {showform && !isSubmitting && !data && !error && (
        <form onSubmit={handleSubmit(submitForm)} className='eventcreateform'>
          <label htmlFor='title'>Enter the title of the event</label>
          <input
            type='text'
            id='title'
            {...register('title', {
              required: 'Introduce the title of the event'
            })}
          />
          {errors.title && (
            <p style={{ color: 'red' }}>{errors.title.message}</p>
          )}

          <label htmlFor='date'>Please select the date</label>
          <input
            type='date'
            id='date'
            min={today}
            {...register('date', { required: 'Please select a valid date' })}
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}

          <label htmlFor='location'>Enter the location of the event</label>
          <input
            type='text'
            id='location'
            {...register('location', {
              required: 'Introduce the location of the event'
            })}
          />
          {errors.location && (
            <p style={{ color: 'red' }}>{errors.location.message}</p>
          )}

          <label htmlFor='description'>
            Enter the description of the event
          </label>
          <input
            type='text'
            id='description'
            {...register('description', {
              required: 'Introduce the description of the event'
            })}
          />
          {errors.description && (
            <p style={{ color: 'red' }}>{errors.description.message}</p>
          )}

          <label htmlFor='Number_of_attendees'>
            Enter the number of attendees
          </label>
          <input
            type='number'
            id='Number_of_attendees'
            {...register('Number_of_attendees', {
              required: 'Introduce the number of attendees'
            })}
          />
          {errors.Number_of_attendees && (
            <p style={{ color: 'red' }}>{errors.Number_of_attendees.message}</p>
          )}
          <span>
            <label htmlFor='eventimg'>
              Please upload an image for the event
            </label>
            <input
              className='file'
              type='file'
              id='eventimg'
              accept='image/*'
              onChange={(e) => setEventImage(e.target.files[0])}
            />
          </span>

          <input
            type='hidden'
            id='eventorganizer'
            value={JSON.parse(localStorage.getItem('staff'))?._id || ''}
            {...register('eventorganizer')}
          />

          <button type='submit' className='general' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
      {data && (
        <div className='success'>
          <p>You successfully created the event, {data.title}.</p>
          <button
            onClick={() => {
              setShowform(true)
              setIsSubmitting(false)
              window.location.reload()
            }}
            className='goback'
          >
            Go back
          </button>
        </div>
      )}

      {error && (
        <div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <button
            onClick={() => {
              setShowform(true)
              setIsSubmitting(false)
              window.location.reload()
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

export default Createevent
