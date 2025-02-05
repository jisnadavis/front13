import { useState, useCallback } from 'react'

const Base_url = 'https://proyecto13-jgl9.vercel.app'

const Usefetch = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchdata = useCallback(async (endpoint, options) => {
    const url = `${Base_url}${endpoint}`
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, options)
      console.log('raw response', response)
      if (!response.ok) {
        const errorDetail = await response.text()
        console.error('API Error Details:', errorDetail)
        throw new Error(errorDetail.message || `Error: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [])

  return { data, error, loading, fetchdata }
}

export default Usefetch
