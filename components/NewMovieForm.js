import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Box, Stack, Center, Text, Heading, Input, Button, CircularProgress } from '@chakra-ui/react'

import { useRouter } from 'next/router'

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    ratings: yup
      .number()
      .test('is-decimal', 'invalid decimal', (value) => (value + '').match(/^\d+(\.\d{0,1})?$/))
      .min(0)
      .max(10)
      .required(),
    year: yup.number().max(2022).positive().integer().required(),
    director: yup.string().required(),
    starring: yup.string().required(),
  })
  .required()

const NewMovieForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading, isError } = useMutation(
    async (title, ratings, year, director, starring) => {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(title, ratings, year, director, starring),
      })
      if (!response.ok) {
        throw new Error('Oh no, something went wrong!')
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['movies'])
      },
    }
  )

  if (isLoading) {
    return (
      <CircularProgress
        isIndeterminate
        marginLeft="auto"
        marginRight="auto"
        marginTop="50vh"
        justifyContent="center"
        display="flex"
      />
    )
  }

  if (isError) {
    return (
      <Text marginTop="50vh" align="center">
        Oops, something went wrong!!
      </Text>
    )
  }

  const onSubmit = handleSubmit((data) => mutate(data, { onSuccess: () => router.push('/') }))

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Center width="100vw" height="100vh">
      <Box p={7} width="500px" borderWidth="3px" marginRight="auto" marginLeft="auto">
        <Heading fontSize="25px" fontWeight="500">
          Add Movie
        </Heading>

        <form onSubmit={onSubmit}>
          <Text fontWeight="500" mt="30px" fontSize="15px">
            Title
          </Text>
          <Input borderWidth="3px" {...register('title')} />
          {errors.title ? (
            <Text color="red" ml="10px">
              Please add Movie title!
            </Text>
          ) : null}
          <Text fontWeight="500" mt="10px" fontSize="15px">
            Ratings
          </Text>
          <Input borderWidth="3px" {...register('ratings')} />
          {errors.ratings ? (
            <Text color="red" ml="10px">
              Please rate a movie from 0-10!
            </Text>
          ) : null}
          <Text fontWeight="500" mt="10px" fontSize="15px">
            Year
          </Text>
          <Input borderWidth="3px" {...register('year')} />
          {errors.year ? (
            <Text color="red" ml="10px">
              Please add a year when movie is released!
            </Text>
          ) : null}
          <Text fontWeight="500" mt="10px" fontSize="15px">
            Director
          </Text>
          <Input borderWidth="3px" {...register('director')} />
          {errors.director ? (
            <Text color="red" ml="10px">
              Please add name of director!
            </Text>
          ) : null}
          <Text fontWeight="500" mt="10px" fontSize="15px">
            Starring
          </Text>
          <Input borderWidth="3px" {...register('starring')} />
          {errors.starring ? (
            <Text color="red" ml="10px">
              Please add name of starring actor!
            </Text>
          ) : null}
          <Stack mt="15px" spacing={2} direction="row" justify="right">
            <Button
              textColor="blue.500"
              border="2px solid #C9DCEB"
              colorScheme="white"
              width="80px"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" width="80px" type="submit">
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  )
}

export default NewMovieForm
