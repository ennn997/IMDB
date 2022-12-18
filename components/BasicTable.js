import { useMemo, useState } from 'react'

import { getCoreRowModel, useReactTable, getSortedRowModel } from '@tanstack/react-table'

import { useQuery } from '@tanstack/react-query'

import { HStack, Button, Stack, Box, Text, CircularProgress } from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import { COLUMNS } from './Columns'
import { getMovies } from '../ssp/getMovies'

import Header from './Header'
import AddMovieButton from './AddMovieButton'
import GlobalFilter from './GlobalFilter'
import MovieTableContainer from './MovieTableContainer'
import YearFilter from './YearFilter'
import RatingFilter from './RatingFilter'

const BasicTable = () => {
  const [globalFilter, setGlobalFilter] = useState('')

  const [rating, setRating] = useState('')

  const [year, setYear] = useState('')

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
  } = useQuery(['movies', pagination.pageIndex, pagination.pageSize, globalFilter, rating, year], getMovies, {
    keepPreviousData: true,
  })

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => movies, [movies])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
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
    <Box width="50rem" marginLeft="auto" marginRight="auto" px="1rem">
      <Header />
      <HStack my="1.5rem" spacing="1.7rem" justify="space-between">
        <GlobalFilter callback={(globalFilter) => setGlobalFilter(globalFilter)} />
        <RatingFilter rating={rating} setRating={setRating} />
        <YearFilter year={year} setYear={setYear} />
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
