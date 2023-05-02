import React from 'react'
import { Button, Box, Td, Link, IconButton, HStack, Th, Tr, Thead, TableContainer, Table, TableCaption, Tbody } from '@chakra-ui/react';
import { SettingsIcon, CopyIcon, ChevronRightIcon, ChevronDownIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";

import { TASK_TYPES, getChildTreeLength, getPossibleSubtask } from '@/utils/constants';
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';

const TableElement = ({ node, elements, editActivity=() => {},deleteTask= () => {}, copyPlan= () => {} }) => {

  return (
    <Tr>
        <Td>{node.name}</Td>
        <Td>{moment(node?.inserted_at).format(dateFormatMonthDayTime)}</Td>
            { node?.type !== TASK_TYPES.ACTIVITY && <Td>{getChildTreeLength(node, elements)}</Td>}
            <Td>
                <HStack >
                  <IconButton colorScheme='brand' aria-label='delete-task-icon' size="xs" onClick={() => copyPlan(node?.id)} icon={<CopyIcon />} />
                  {
                    node?.type === TASK_TYPES.ACTIVITY ? 
                    (<IconButton colorScheme='brand' aria-label='add-task-icon' size="xs" onClick={() => editActivity(node?.id)} icon={<SettingsIcon />} />) : 
                    (<IconButton colorScheme='brand' aria-label='open-task-icon' size="xs" icon={<ExternalLinkIcon />} as={Link} href={`/${node?.type}/${node?.id}`} />)
                  }
                <IconButton colorScheme='brand' aria-label='delete-task-icon' size="xs" onClick={() => deleteTask(node?.id)} icon={<DeleteIcon />} />
                {/* <IconButton colorScheme='brand' aria-label='open-task-icon' size="xs" icon={<ExternalLinkIcon />} as={Link} href={`/task/${node?.id}`} />  */}
                </HStack>
            </Td>

    </Tr>
  )
}
export const FolderTable = ({ taskTree, parentId, copyPlan, deleteTask, editActivity }) => {
  if (taskTree.length) {
    const rootElements = taskTree.filter(el => el.parent_id === parentId);
    const elementSubtasks = getPossibleSubtask(rootElements[0])
    return (
      <TableContainer color={'brand.50'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>Name</Th>
            <Th>Created</Th>
            {elementSubtasks && <Th>{`No. ${elementSubtasks}s`} </Th>}
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
            editActivity={editActivity}
            copyPlan={copyPlan}
            />))}
            </Tbody>
        </Table>
      </TableContainer>
    )
  }
}