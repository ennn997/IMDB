import { useRouter } from 'next/router'

import { Button } from '@chakra-ui/react'

const AddMovieButton = () => {
  const router = useRouter()

  const handleNewMovie = () => {
    router.push('/newMovie')
  }
  return (
    <Button color="white" bg="blue.500" _hover={{ opacity: 0.8 }} onClick={handleNewMovie} width="8rem">
      + Add Movie
    </Button>
  )
}

export default AddMovieButton
