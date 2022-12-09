import { useMemo, useState } from 'react'

import { getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table'

import { rankItem } from '@tanstack/match-sorter-utils'

import { useQuery } from '@tanstack/react-query'

import { HStack, Button, Stack, Box, Text, CircularProgress } from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import { COLUMNS } from './Columns'
import { getMovies } from '../ssp/getMovies'

import Header from './Header'
import AddMovieButton from './AddMovieButton'
import GlobalFilter from './GlobalFilter'
import MovieTableContainer from './MovieTableContainer'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank,
  })

  return itemRank.passed
}

const BasicTable = () => {
  const [globalFilter, setGlobalFilter] = useState('')

  const [sorting, setSorting] = useState([])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const {
    isLoading,
    data: movies,
    isError,
    error,
  } = useQuery(['movies', pagination.pageIndex, pagination.pageSize], getMovies, { keepPreviousData: true })

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => movies, [movies])

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting, pagination },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: data && data.length,
  })

  if (isLoading) {
    return <CircularProgress isIndeterminate marginTop="50vh" justifyContent="center" display="flex" />
  }

  if (isError) {
    return (
      <Text align="center" marginTop="50vh">
        {error.message}
      </Text>
    )
  }

  return (
    <Box width="56rem" marginLeft="auto" marginRight="auto" px="1rem">
      <Header />
      <HStack my="1.5rem" justify="space-between">
        <GlobalFilter callback={(globalFilter) => setGlobalFilter(globalFilter)} />
        <AddMovieButton />
      </HStack>
      <MovieTableContainer table={table} />
      <Stack mt="1.3rem" mb="2.6rem" spacing={2} direction="row" justify="right">
        <Button
          leftIcon={<ChevronLeftIcon boxSize={6} />}
          textColor="blue.500"
          border="0.17rem solid #C9DCEB"
          colorScheme="white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <Button
          rightIcon={<ChevronRightIcon boxSize={6} />}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          textColor="blue.500"
          border="0.17rem solid #C9DCEB"
          colorScheme="white"
        >
          Next
        </Button>
      </Stack>
    </Box>
  )
}

export default BasicTable
