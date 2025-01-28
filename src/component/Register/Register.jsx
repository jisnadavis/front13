import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Usefetch from '../customhook/Usefetch'
import './Register.css'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { data, error, loading, fetchdata } = Usefetch()
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const submitForm = (formdata) => {
    const endpoint = '/api/v1/staffs/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
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
    error === 'Error: 409'
      ? 'The email is already registered.'
      : 'cant not register the staff'
  return (
    <div className='form-container'>
      {(!showForm || isSubmitting) && (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      )}

      {showForm && !isSubmitting && !data && !error && (
        <form className='formregister' onSubmit={handleSubmit(submitForm)}>
          <label htmlFor='name'>Enter your name</label>
          <input
            type='text'
            id='name'
            {...register('name', { required: 'Introduce your name' })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

          <label htmlFor='apellidos'>Enter your apellidos</label>
          <input
            type='text'
            id='apellidos'
            {...register('apellidos', { required: 'Introduce your apellidos' })}
          />
          {errors.apellidos && (
            <p style={{ color: 'red' }}>{errors.apellidos.message}</p>
          )}

          <label htmlFor='email'>Enter your email</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: 'Introduce your email',
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]*[0-9]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'The email ID should contain one number and @'
              },
              minLength: {
                value: 6,
                message: 'Should contain minimum 6 letters'
              }
            })}
            style={{ borderColor: errors.email ? 'red' : 'black' }}
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}

          <label htmlFor='NIE'>Enter your NIE</label>
          <input
            type='text'
            id='NIE'
            {...register('NIE', {
              required: 'Please enter your NIE',
              pattern: {
                value: /^[A-Za-z][0-9]{7}[A-Za-z]$/,
                message: 'Please enter a valid NIE'
              }
            })}
          />
          {errors.NIE && <p style={{ color: 'red' }}>{errors.NIE.message}</p>}

          <label htmlFor='dirreccion'>Enter your direccion</label>
          <input
            type='text'
            id='dirreccion'
            {...register('dirreccion', {
              required: 'Please enter your direccion'
            })}
          />
          {errors.dirreccion && (
            <p style={{ color: 'red' }}>{errors.dirreccion.message}</p>
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
            Submit
          </button>
        </form>
      )}

      {data && (
        <div className='success'>
          <p>You are successfully registered, {data.name}.</p>
          <button
            onClick={() => {
              setShowForm(true)
              setIsSubmitting(false)
              window.location.reload()
            }}
            className='goback'
          >
            go back
          </button>
        </div>
      )}

      {error && (
        <div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <button
            onClick={() => {
              setShowForm(true)
              setIsSubmitting(false)
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

export default Register
