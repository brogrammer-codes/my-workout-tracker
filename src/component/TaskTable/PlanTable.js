import React from 'react'
import { Button, Box, Td, Link, IconButton, HStack, Th, Tr, Thead, TableContainer, Table, Text, Tbody } from '@chakra-ui/react';
import { ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import { getChildTreeLength } from '@/utils/constants';
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';



const TableElement = ({ node, elements, addTask = () => { }, deleteTask = () => { } }) => {

  return (
    <Tr bg={node?.complete && 'brandCard.50'}>
      <Td><Text as={Link} href={`/${node?.type}/${node?.id}`} >{node.name}</Text></Td>
      <Td>{moment(node?.inserted_at).format(dateFormatMonthDayTime)}</Td>
      <Td>{getChildTreeLength(node, elements)}</Td>
      <Td>
        <HStack >
          <IconButton colorScheme='brand' aria-label='open-task-icon' size="xs" icon={<DeleteIcon />} onClick={() => deleteTask(node?.id)} />
        </HStack>
      </Td>
    </Tr>
  )
}
export const PlanTable = ({ taskTree, parentId, pageTask, deleteTask }) => {
  if (taskTree.length) {
    const rootElements = taskTree.filter(el => el.parent_id === parentId);
    return (
      <TableContainer color={'brand.50'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Created</Th>
              <Th>No. Activities</Th>
              <Th>Control</Th>
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
