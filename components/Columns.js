import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

function roundedToFixed(input, digits) {
  const rounded = Math.pow(10, digits)
  return (Math.round(input * rounded) / rounded).toFixed(digits)
}

export const COLUMNS = [
  columnHelper.accessor('title', {
    header: () => 'Movie name',
    id: 'title',
    enableColumnFilter: false,
    size: 350,
    minSize: 100,
    maxSize: 400,
  }),
  columnHelper.accessor('ratings', {
    header: () => <div style={{ textAlign: 'center', align: 'center' }}>Ratings</div>,
    cell: (num) => roundedToFixed(num.getValue(), 1),
    id: 'ratings',
    enableGlobalColumnFilter: false,
    filterFn: (row, id, filterValue) => row.getValue(id).startsWith(filterValue),
  }),
  columnHelper.accessor('year', {
    header: () => <div style={{ textAlign: 'center' }}>Year</div>,
    id: 'year',
    enableGlobalColumnFilter: false,
  }),
  columnHelper.accessor('director', {
    header: () => 'Director',
    id: 'director',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('starring', {
    header: () => 'Starring',
    id: 'staring',
    enableColumnFilter: false,
  }),
]
