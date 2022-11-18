import { ChakraProvider } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
