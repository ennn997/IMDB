import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const roundedToFixed = (input, digits) => {
  const rounded = Math.pow(10, digits)
  return (Math.round(input * rounded) / rounded).toFixed(digits)
}

export const COLUMNS = [
  columnHelper.accessor('title', {
    header: () => 'Movie name',
    id: 'title',
    enableColumnFilter: false,
    size: 200,
  }),
  columnHelper.accessor('ratings', {
    header: () => 'Ratings',
    id: 'ratings',
    cell: (num) => roundedToFixed(num.getValue(), 1),
    enableGlobalColumnFilter: false,
    filterFn: (row, id, filterValue) => row.getValue(id).startsWith(filterValue),
  }),
  columnHelper.accessor('year', {
    header: () => 'Year',
    id: 'year',
    enableGlobalColumnFilter: false,
  }),
  columnHelper.accessor('director', {
    header: () => 'Director',
    id: 'director',
    enableColumnFilter: false,
    size: 180,
  }),
  columnHelper.accessor('starring', {
    header: () => 'Starring',
    id: 'staring',
    enableColumnFilter: false,
    size: 150,
  }),
]
