import React from 'react'
import { Box, Text, Link, IconButton, HStack, Th, Tr, Thead, TableContainer, Table, TableCaption, Tbody, Grid, GridItem, Divider } from '@chakra-ui/react';
import { SettingsIcon, CopyIcon, Icon, ChevronDownIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";

import { TASK_TYPES, getChildTreeLength, getPossibleSubtask } from '@/utils/constants';
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';
import { FaExternalLinkAlt } from 'react-icons/fa'
import { DeleteTaskIcon } from '../DeleteTaskIcon';
import { TableControl } from './TableControl';

const TableElement = ({ node, elements, editActivity = () => { }, deleteTask = () => { }, copyPlan = () => { } }) => {

  return (
    <>
      {node?.type === TASK_TYPES.ACTIVITY ? <GridItem>{node.name}</GridItem> : <GridItem><Text as={Link} href={`/${node?.type}/${node?.id}`} >{node.name}</Text></GridItem>}

      <GridItem>{moment(node?.inserted_at).format(dateFormatMonthDayTime)}</GridItem>
      <GridItem>{node?.type !== TASK_TYPES.ACTIVITY && getChildTreeLength(node, elements)}</GridItem>
      <GridItem>
        <TableControl>

          <IconButton colorScheme='brand' aria-label='delete-task-icon' size="sm" onClick={() => copyPlan(node?.id)} icon={<CopyIcon boxSize={4} />} />
          {
            node?.type === TASK_TYPES.ACTIVITY ?
              (<IconButton colorScheme='brand' aria-label='add-task-icon' size="sm" onClick={() => editActivity(node?.id)} icon={<SettingsIcon boxSize={4} />} />) :
              (<IconButton colorScheme='brand' aria-label='open-task-icon' size="sm" icon={<Icon as={FaExternalLinkAlt} boxSize={4} />} as={Link} href={`/${node?.type}/${node?.id}`} />)
          }
          <DeleteTaskIcon onDelete={() => deleteTask(node?.id)} taskName={node?.name} />

        </TableControl>
      </GridItem>
          <GridItem colSpan={4}>
            <Divider />
          </GridItem>
    </>
  )
}
export const FolderTable = ({ taskTree, parentId, copyPlan, deleteTask, editActivity }) => {
  if (taskTree.length) {
    const rootElements = taskTree.filter(el => el?.parent_id === parentId);
    const elementSubtasks = getPossibleSubtask(rootElements[0])
    return (
      <Box color={'brand.50'}>
        <Grid templateColumns='repeat(4, 1fr)' gap={2}>
          <GridItem><Text fontWeight='bold'>Name</Text> </GridItem>
          <GridItem><Text fontWeight='bold'>Created</Text></GridItem>
          <GridItem><Text fontWeight='bold'>{elementSubtasks && `No. ${elementSubtasks}s`}</Text></GridItem>

          <GridItem><Text fontWeight='bold'>Control</Text></GridItem>

          {rootElements.map((root) => (
            <TableElement
              key={root.id}
              node={root}
              elements={taskTree}
              deleteTask={deleteTask}
              editActivity={editActivity}
              copyPlan={copyPlan}
            />))}
        </Grid>
      </Box>
    )
  }
}
