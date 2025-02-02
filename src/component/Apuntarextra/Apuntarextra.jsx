import React, { useEffect, useState } from 'react'
import Usefetch from '../customhook/Usefetch'
import { useForm } from 'react-hook-form'

const Apuntarextra = () => {
  const [Showextraform, SetShowextraform] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { loading, error, fetchdata, data } = Usefetch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const today = new Date().toISOString().split('T')[0]
  useEffect(() => {
    const timer = setTimeout(() => {
      SetShowextraform(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  const staff = JSON.parse(localStorage.getItem('staff'))
  const staffid = staff._id
  console.log(staffid)
  const apuntarextra = async (formdata) => {
    const formattedDate = formdata.fecha
    console.log(formattedDate)
    const payload = {
      name_of_the_staff: staffid,
      fecha: formattedDate, // Send the date as-is
      hours: Number(formdata.hours), // Ensure this matches the backend field name
      lugar: formdata.lugar
    }
    console.log(formdata)
    const endpoint = `/api/v1/extrahour/${staffid}`
    const token = localStorage.getItem('token')
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    console.log(endpoint)
    setIsSubmitting(true)
    await fetchdata(endpoint, options)
  }
  useEffect(() => {
    if (!loading && isSubmitting) {
      setIsSubmitting(false)
    }
  }, [loading, isSubmitting])
  const errorMessage =
    error === 'Error: 400'
      ? 'Invalid date format.or invalid time.'
      : error === 'Error: 404'
      ? 'staff member not found.'
      : 'An unknown error occurred.'
  return (
    <div>
      {(!Showextraform || isSubmitting) && (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      )}
      {Showextraform && !isSubmitting && !data && !error && (
        <form onSubmit={handleSubmit(apuntarextra)} className='eventcreateform'>
          <input
            type='hidden'
            id='name_of_the_staff'
            value={JSON.parse(localStorage.getItem('staff'))?._id || ''}
            {...register('name_of_the_staff')}
          />
          <label htmlFor='fecha'> enter date of your extrahours</label>
          <input
            id='fecha'
            type='date'
            max={today}
            {...register('fecha', { required: 'please enter a date' })}
          />
          {errors.fecha && (
            <p style={{ color: 'red' }}>{errors.fecha.message}</p>
          )}
          <label htmlFor='hours'> enter total hours of your extrahours</label>
          <input
            id='hours'
            type='number'
            {...register('hours', {
              required: 'please enter your extra hours'
            })}
          />
          {errors.hours && (
            <p style={{ color: 'red' }}>{errors.hours.message}</p>
          )}
          <label htmlFor='lugar'> enter the place of your work</label>
          <input
            id='lugar'
            type='string'
            {...register('lugar', {
              required: 'please enter the place of work'
            })}
          />
          {errors.lugar && (
            <p style={{ color: 'red' }}>{errors.lugar.message}</p>
          )}
          <button type='submit' className='general' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
      {data && (
        <div className='success'>
          <p>You successfully created yourextra, {staff.name}.</p>
          <button
            onClick={() => {
              SetShowextraform(true)
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
              SetShowextraform(true)
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

export default Apuntarextra
