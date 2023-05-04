import React from 'react'
import { Button, Box, Td, Link, Text, HStack, Th, Tr, Thead, TableContainer, Table, TableCaption, Tbody } from '@chakra-ui/react';
import moment from 'moment';
import { getChildTreeLength } from '@/utils/constants';



const TableElement = ({ node, elements, depth }) => {
  const childElements = elements.filter(el => el.parent_id === node.id);
  // check node type here and render the correct list item
  return (
    <Tr>
      <Td>{node.name}</Td>
      <Td>{moment(node?.inserted_at).format(dateFormatMonthDayTime)}</Td>

      <Tbody>
        {childElements.map(child => (
          <TableElement key={child.id} node={child} elements={elements} addTask={addTask} depth={depth + 1} deleteTask={deleteTask} />
        ))}
      </Tbody>
    </Tr>
  )
}
export const TaskTable = ({ taskTree, parentId, pageTask }) => {
  if (taskTree.length) {
    const rootElements = taskTree.find(el => el.parent_id === parentId);
    return (
      <TableContainer color={'brand.50'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>
          <Tbody>

            {rootElements.map((root) => (
              <TableElement
                key={root.id}
                node={root}
                elements={taskTree}
                deleteTask={deleteTask}
              />))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
}
