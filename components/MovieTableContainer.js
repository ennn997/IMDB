import { TableContainer, Table, Thead, Tbody, Tr, Th, Td, HStack } from '@chakra-ui/react'

import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

import { flexRender } from '@tanstack/react-table'

import ColumnFilter from './ColumnFilter'

const MovieTableContainer = ({ table }) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  border="0.12rem solid #C9DCEB"
                  fontWeight="900"
                  color="blackAlpha.900"
                  fontSize="0.8rem"
                  textTransform="capitalization"
                  style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                >
                  <div
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    <HStack>
                      {{
                        asc: <ChevronUpIcon boxSize={6} />,
                        desc: <ChevronDownIcon boxSize={6} />,
                      }[header.column.getIsSorted()] || null}
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </HStack>
                  </div>
                  {header.column.getCanFilter() ? (
                    <div style={{ marginTop: '10px' }}>
                      <ColumnFilter column={header.column} table={table} />
                    </div>
                  ) : null}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <Td
                  key={cell.id}
                  border="0.12rem solid #C9DCEB"
                  fontSize="0.8rem"
                  color="blackAlpha.900"
                  fontWeight="500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MovieTableContainer
