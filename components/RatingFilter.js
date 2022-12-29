import { Select } from '@chakra-ui/react'

const RatingFilter = ({ rating, setRating }) => {
  const handleChange = (e) => {
    setRating(e.target.value)
  }
  return (
    <Select
      width="5.6rem"
      border="0.17rem solid #C9DCEB"
      fontSize="0.9rem"
      value={rating}
      onChange={handleChange}
      data-cy="select"
    >
      <option value="">-</option>
      <option value="0">0-1</option>
      <option value="1">1-2</option>
      <option value="2">2-3</option>
      <option value="3">3-4</option>
      <option value="4">4-5</option>
      <option value="5">5-6</option>
      <option value="6">6-7</option>
      <option value="7">7-8</option>
      <option value="8">8-9</option>
      <option value="9">9-10</option>
      <option value="10">10.0</option>
    </Select>
  )
}

export default RatingFilter
