import { ChakraProvider } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'

import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
