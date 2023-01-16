import { Input } from '@chakra-ui/react'

const YearFilter = ({ year, setYear }) => {
  return (
    <>
      <Input
        value={year?.[0] || ''}
        onChange={(e) => setYear((old) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        width="4.5rem"
        fontSize="0.9rem"
        border="0.17rem solid #C9DCEB"
        data-cy="min"
      />
      <Input
        value={year?.[1] || ''}
        onChange={(e) => setYear((old) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        width="4.5rem"
        fontSize="0.9rem"
        border="0.17rem solid #C9DCEB"
        data-cy="max"
      />
    </>
  )
}

export default YearFilter
