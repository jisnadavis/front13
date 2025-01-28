import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Usefetch from '../customhook/Usefetch'
import { Navigate } from 'react-router-dom'
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
    }, 3000)
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
      }, [1500])
    }
  }, [loading, submitting, data])
  const errorMessage =
    error === 'Error: 400'
      ? 'Invalid email or password'
      : 'cant not login the staff'
  return (
    <div className='logincontainer'>
      {(!showForm || (submitting && !error)) && (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      )}
      {showForm && !data && !error && !submitting && (
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
        </form>
      )}
      {data && (
        <div className='login_success'>
          <p>{`Welcome, ${data.staff.name}! please click on the activity button to mange your activities`}</p>
        </div>
      )}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <button
            onClick={() => {
              setShowForm(true)
              setSubmitting(false)
              window.location.reload()
            }}
            className='goback'
          >
            go back
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
