import { chakra, Text } from '@chakra-ui/react'

const Header = () => {
  return (
    <chakra.header mt="3rem">
      <Text fontSize={['1.5rem', null, '2.5rem']} fontWeight="500" data-cy="table header">
        MovieDB
      </Text>
    </chakra.header>
  )
}

export default Header
