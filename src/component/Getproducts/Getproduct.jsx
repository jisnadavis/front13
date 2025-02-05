import { useEffect, useState } from 'react'
import Usefetch from '../customhook/Usefetch'
import './Getproduct.css'

const Getproduct = () => {
  const { loading, data, fetchdata, error } = Usefetch()
  const [showproducts, setshowproducts] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowproducts(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const endpoint = '/api/v1/products'
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
      ? 'Cannot show any products only authorized persons can see the products'
      : 'Unknown error'

  return (
    <div className='getevents'>
      {!showproducts && !error && (
        <img
          className='loading_img'
          src='https://www.decoches.net/web/assets/custom/img/loading.gif'
          alt='loading'
        />
      )}
      {showproducts && (
        <div className='productparticular'>
          {Array.isArray(data) &&
            data.map((product) => (
              <div key={product._id} className='product'>
                <div className='eventdes'>
                  <h1>{product.name_of_the_products}</h1>
                  <div className='pdes'>
                    <h2>expiry:</h2>
                    <h2>
                      {
                        new Date(product.fecha_de_caducidad)
                          .toISOString()
                          .split('T')[0]
                      }
                    </h2>
                  </div>
                  <div className='pdes'>
                    <h3> category:</h3>
                    <h3>{product.categoria}</h3>
                  </div>
                  <div className='pdes'>
                    <h3>provedor:</h3>
                    <h3>{product.provedor}</h3>
                  </div>
                  <div className='pdes'>
                    <h3>stock:</h3>
                    <p>{product.stock}</p>
                  </div>
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

export default Getproduct
