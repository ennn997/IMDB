import { useState } from 'react'

import { Input } from '@chakra-ui/react'

const GlobalFilter = ({ callback }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    callback(inputValue)
  }

  return (
    <form onSubmit={handleSubmit} data-cy="global filter input">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by title, director or starring actor..."
        width="20rem"
        border="0.17rem solid #C9DCEB"
        fontSize="0.9rem"
      />
    </form>
  )
}

export default GlobalFilter
