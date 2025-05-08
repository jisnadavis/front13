import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Usefetch from '../customhook/Usefetch'
import './Login.css'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { data, error, loading, fetchdata } = Usefetch()
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  const submitForm = (formdata) => {
    const endpoint = '/api/v1/staffs/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    }
    setSubmitting(true)
    fetchdata(endpoint, options)
  }

  useEffect(() => {
    if (!loading && submitting && data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('staff', JSON.stringify(data.staff))
      setSubmitting(false)
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  }, [loading, submitting, data])

  const errorMessage =
    error === 'Error: 400'
      ? 'Invalid email or password'
      : 'Cannot login the staff'

  return (
    <div className='logincontainer'>
      {submitting && !data && !error && (
        <div className='loading'>
          <img
            className='loading_img'
            src='https://www.decoches.net/web/assets/custom/img/loading.gif'
            alt='Loading...'
          />
          <p>Logging in, please wait...</p>
        </div>
      )}

      {(!submitting || error) && showForm && !data && (
        <form className='loginform' onSubmit={handleSubmit(submitForm)}>
          <label htmlFor='email'>Enter your email ID</label>
          <input
            type='text'
            id='email'
            {...register('email', { required: 'Please enter your email ID' })}
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}

          <label htmlFor='password'>Enter your password</label>
          <input
            type='password'
            id='password'
            {...register('password', {
              required: 'Please enter your password'
            })}
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}

          <button type='submit' className='general'>
            Login
          </button>

          {error && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>
          )}
        </form>
      )}

      {data && (
        <div className='login_success'>
          <p>{`Welcome, ${data.staff.name}! Please click on the activity button to manage your activities.`}</p>
        </div>
      )}
    </div>
  )
}

export default Login
