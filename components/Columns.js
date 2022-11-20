import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const roundedToFixed = (input, digits) => {
  const rounded = Math.pow(10, digits)
  return (Math.round(input * rounded) / rounded).toFixed(digits)
}

export const COLUMNS = [
  columnHelper.accessor('title', {
    header: () => 'Movie name',
    enableColumnFilter: false,
    size: 200,
  }),
  columnHelper.accessor('ratings', {
    header: () => 'Ratings',
    cell: (num) => roundedToFixed(num.getValue(), 1),
    enableGlobalColumnFilter: false,
    filterFn: (row, id, filterValue) => row.getValue(id).startsWith(filterValue),
  }),
  columnHelper.accessor('year', {
    header: () => 'Year',
    enableGlobalColumnFilter: false,
  }),
  columnHelper.accessor('director', {
    header: () => 'Director',
    enableColumnFilter: false,
    size: 180,
  }),
  columnHelper.accessor('starring', {
    header: () => 'Starring',
    enableColumnFilter: false,
    size: 150,
  }),
]
