import NextImage from 'next/image'

import { useSession, signIn, signOut } from 'next-auth/react'

import { Flex, useColorModeValue, Button } from '@chakra-ui/react'

import logo from '../public/imdb.png'

const NavBar = () => {
  const { data: session } = useSession()

  let btn

  if (session) {
    btn = (
      <Button
        as="a"
        variant="link"
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize="sm"
        fontWeight={600}
        width="5rem"
        onClick={() => signOut()}
        href="/"
      >
        Sign Out
      </Button>
    )
  } else {
    btn = (
      <Button
        as="a"
        variant="link"
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize="sm"
        fontWeight={600}
        width="5rem"
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    )
  }

  return (
    <Flex
      justify="space-between"
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <NextImage src={logo} alt="logo" />
      {btn}
    </Flex>
  )
}

export default NavBar
