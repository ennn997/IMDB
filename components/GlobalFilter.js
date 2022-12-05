import { useState } from 'react'

import { Input } from '@chakra-ui/react'

const GlobalFilter = ({ callback }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    callback(inputValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by movie name, director or starring..."
        width="45rem"
        border="0.17rem solid #C9DCEB"
        fontSize="0.9rem"
      />
    </form>
  )
}

export default GlobalFilter
