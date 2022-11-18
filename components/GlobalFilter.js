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
        placeholder="Search by movie name, director or starring actor..."
        width="770px"
        border="2px solid #C9DCEB"
      />
    </form>
  )
}

export default GlobalFilter