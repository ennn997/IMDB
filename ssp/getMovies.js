export const getMovies = async () => {
  const response = await fetch(`/api/`)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Network response not ok!')
  }
}
