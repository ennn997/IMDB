export const getMovies = async (context) => {
  const url = new URL(`/api`)
  url.searchParams.set('start', `${context.queryKey[1] * context.queryKey[2]}`)
  url.searchParams.set('size', `${context.queryKey[2]}`)

  const response = await fetch(url.href)

  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Network response not ok!')
  }
}
