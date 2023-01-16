import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Box,
  Stack,
  Center,
  Text,
  Heading,
  Input,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

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
      const response = await fetch('/api', {
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
      <Box p={7} width="30rem" borderWidth="0.2rem" marginRight="auto" marginLeft="auto">
        <Heading fontSize="1.7rem" fontWeight="500">
          Add Movie
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={errors.title}>
            <FormLabel mt="2rem">Title</FormLabel>
            <Input borderWidth="0.2rem" {...register('title')} data-cy="title input" />
            <FormErrorMessage data-cy="title error msg">Please add Movie title!</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.ratings}>
            <FormLabel mt="0.8rem">Ratings</FormLabel>
            <Input borderWidth="0.2rem" {...register('ratings')} data-cy="rating input" />
            <FormErrorMessage data-cy="rating error msg">Please rate a movie from 0-10!</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.year}>
            <FormLabel mt="0.8rem">Year</FormLabel>
            <Input borderWidth="0.2rem" {...register('year')} data-cy="year input" />
            <FormErrorMessage data-cy="year error msg">Please add a year when movie is released!</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.director}>
            <FormLabel mt="0.8rem">Director</FormLabel>
            <Input borderWidth="0.2rem" {...register('director')} data-cy="director input" />
            <FormErrorMessage data-cy="director error msg">Please add name of director!</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.starring}>
            <FormLabel mt="0.8rem">Starring</FormLabel>
            <Input borderWidth="0.2rem" {...register('starring')} data-cy="starring input" />
            <FormErrorMessage data-cy="starring error msg">Please add name of starring actor!</FormErrorMessage>
          </FormControl>

          <Stack mt="1rem" spacing={2} direction="row" justify="right">
            <Button
              textColor="blue.500"
              border="0.17rem solid #C9DCEB"
              colorScheme="white"
              width="5rem"
              onClick={handleCancel}
              data-cy="cancel button"
            >
              Cancel
            </Button>
            <Button colorScheme="blue" width="5rem" type="submit" data-cy="submit button">
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  )
}

export default NewMovieForm
