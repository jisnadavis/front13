import { useForm } from 'react-hook-form'
import Usefetch from '../customhook/Usefetch'
import './Createproduct.css'
import { useEffect, useState } from 'react'

const Createproduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [showform, setShowform] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { loading, error, fetchdata, data } = Usefetch()
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowform(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  const submitForm = async (formdata) => {
    const date = new Date(formdata.fecha_de_caducidad)

    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date format')
      return
    }

    // Format the date properly
    const formattedDate = date.toISOString().split('T')[0]

    // Construct a plain JSON object
    const payload = {
      name_of_the_products: formdata.name_of_the_products,
      fecha_de_caducidad: formattedDate,
      categoria: formdata.categoria,
      stock: Number(formdata.stock), // Ensure it's a number
      provedor: formdata.provedor
    }

    console.log('Submitting payload:', payload) // Debugging log

    const endpoint = '/api/v1/products/'
    const token = localStorage.getItem('token')

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload) // Ensure JSON format
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
      ? 'Invalid date format. Unable to create the product.'
      : error === 'Error: 403'
      ? 'You are not authorized to create the product.'
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
          <label htmlFor='name_of_the_products'>
            Enter the name of the product
          </label>
          <input
            type='text'
            id='name_of_the_products'
            {...register('name_of_the_products', {
              required: 'Introduce the name_of_the_products'
            })}
          />
          {errors.name_of_the_products && (
            <p style={{ color: 'red' }}>
              {errors.name_of_the_products.message}
            </p>
          )}

          <label htmlFor='fecha_de_caducidad'>Please select the date</label>
          <input
            type='date'
            id='fecha_de_caducidad'
            min={today}
            {...register('fecha_de_caducidad', {
              required: 'Please select a valid date'
            })}
          />
          {errors.fecha_de_caducidad && (
            <p style={{ color: 'red' }}>{errors.fecha_de_caducidad.message}</p>
          )}

          <label htmlFor='categoria'>Enter the categoria</label>
          <input
            type='text'
            id='categoria'
            {...register('categoria', {
              required: 'Introduce categoria of the product'
            })}
          />
          {errors.categoria && (
            <p style={{ color: 'red' }}>{errors.categoria.message}</p>
          )}

          <label htmlFor='stock'>Enter the stock</label>
          <input
            type='number'
            id='description'
            {...register('stock', {
              required: 'Introduce the stock'
            })}
          />
          {errors.stock && (
            <p style={{ color: 'red' }}>{errors.stock.message}</p>
          )}

          <label htmlFor='provedor'>Enter the provedor</label>
          <input
            type='text'
            id='provedor'
            {...register('provedor', {
              required: 'Introduce the provedor'
            })}
          />
          {errors.provedor && (
            <p style={{ color: 'red' }}>{errors.provedor.message}</p>
          )}

          <button type='submit' className='general' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
      {data && (
        <div className='success'>
          <p>You successfully created the product, {data.title}.</p>
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

export default Createproduct
