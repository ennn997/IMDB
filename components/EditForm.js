import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Input,
  Center,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  CircularProgress,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
  })
  .required()

const EditForm = () => {
  const router = useRouter()

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const queryClient = useQueryClient()

  const { query } = router
  const { title } = query

  const { mutate, isLoading, isError } = useMutation(
    async (title) => {
      const { id } = query

      const response = await fetch(`/api/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(title),
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
    <Center width="100vw" height="50vh">
      <Box p={7} width="30rem" borderWidth="0.2rem" marginRight="auto" marginLeft="auto">
        <Heading fontSize="1.7rem" fontWeight="500">
          Edit Form
        </Heading>

        <form onSubmit={onSubmit}>
          <FormControl isInvalid={errors.title}>
            <FormLabel>
              <Input
                fontSize="1.7rem"
                fontWeight="500"
                align="center"
                mt="2rem"
                defaultValue={title}
                onChange={(e) => setValue('title', e.target.value)}
              />
            </FormLabel>
            <FormErrorMessage>Input field cannot be empty!</FormErrorMessage>
          </FormControl>

          <Stack mt="1rem" spacing={2} direction="row" justify="right">
            <Button
              textColor="blue.500"
              border="0.17rem solid #C9DCEB"
              colorScheme="white"
              width="5rem"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" width="5rem" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  )
}

export default EditForm
