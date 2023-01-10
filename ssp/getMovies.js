import { server } from '../config/server'

export const getMovies = async (context) => {
  const url = new URL(`${server}/api`)
  url.searchParams.set('start', `${context.queryKey[1] * context.queryKey[2]}`)
  url.searchParams.set('size', `${context.queryKey[2]}`)

  if (`${context.queryKey[3]}`) {
    url.searchParams.set('globalFilter', `${context.queryKey[3] || ''}`)
  }

  if (`${context.queryKey[4]}`) {
    url.searchParams.append('rating', `${context.queryKey[4] || ''}`)
  }

  if (`${context.queryKey[5]}`) {
    url.searchParams.set('year', context.queryKey[5] || '')
  }

  const response = await fetch(url.href, {
    mode: 'no-cors',
  })

  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Network response not ok!')
  }
}
