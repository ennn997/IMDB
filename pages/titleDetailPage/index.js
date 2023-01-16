import { useRouter } from 'next/router'

import { Button } from '@chakra-ui/react'

import TitleDetailPage from '../../components/TitleDetailPage'

const DetailPage = () => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.back()} variant="ghost" data-cy="back button">
        Go Back
      </Button>
      <TitleDetailPage />
    </>
  )
}

export default DetailPage
