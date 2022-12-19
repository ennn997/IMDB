import { Text, Center, Box } from '@chakra-ui/react'

import { useRouter } from 'next/router'

const TitleDetailPage = () => {
  const router = useRouter()

  const { query } = router

  return (
    <Center width="100vw" height="50vh">
      <Box p={7} width="30rem" borderWidth="0.2rem" marginRight="auto" marginLeft="auto">
        <Text fontSize="1.7rem" fontWeight="500" align="center">
          {query.title}
        </Text>
      </Box>
    </Center>
  )
}

export default TitleDetailPage
