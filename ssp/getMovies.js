import { server } from '../config'

export const getMovies = async () => {
  const response = await fetch(`${server}/api/`)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Network response not ok!')
  }
}
