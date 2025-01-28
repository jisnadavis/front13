import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='app'>
      <div className='image-container'>
        <img src='./src/assets/foodhome.jpg' alt='foodhome' className='home' />
      </div>
      <h1> "Impulsa tu Carrera en la Hostelería: "</h1>
      <h2 className='typewriter'> "La felicidad empieza "</h2>
      <h2 className='typewriter1'> a través del paladar"</h2>
    </div>
  )
}

export default Home
