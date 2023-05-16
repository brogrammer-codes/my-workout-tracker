import React from 'react'
import { GridItem, Box, Td, Link, IconButton, Grid, Text, useMediaQuery } from '@chakra-ui/react';
import { Icon } from "@chakra-ui/icons";
import { getChildTreeLength } from '@/utils/constants';
import moment from 'moment';
import { dateFormatMonthDayTime, dateFormatMonthDayTimeShort } from '@/utils/formats';
import { FaExternalLinkAlt } from 'react-icons/fa'
import { DeleteTaskIcon } from '../DeleteTaskIcon';
import { TableControl } from './TableControl';



const TableElement = ({ node, elements, addTask = () => { }, deleteTask = () => { } }) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 800px)")

  return (
    <>
      <GridItem bg={node?.complete && 'brandCard.50'} height={"4em"} display="flex" overflow={'hidden'}><Text as={Link} href={`/${node?.type}/${node?.id}`} >{node.name}</Text></GridItem>
      <GridItem bg={node?.complete && 'brandCard.50'} height={"4em"} display="flex">{moment(node?.inserted_at).format(isLargeScreen ? dateFormatMonthDayTime : dateFormatMonthDayTimeShort)}</GridItem>
      <GridItem bg={node?.complete && 'brandCard.50'} height={"4em"} display="flex">{getChildTreeLength(node, elements)}</GridItem>
      <GridItem bg={node?.complete && 'brandCard.50'} height={"4em"} display="flex">
        <TableControl>
          <IconButton colorScheme='brand' aria-label='open-task-icon' size='sm' icon={<Icon as={FaExternalLinkAlt} boxSize={4} />} as={Link} href={`/${node?.type}/${node?.id}`} />
          <DeleteTaskIcon onDelete={() => deleteTask(node?.id)} taskName={node?.name} />
        </TableControl>
      </GridItem>
    </>
  )
}
export const PlanTable = ({ taskTree, parentId, pageTask, deleteTask }) => {
  if (taskTree.length) {
    const rootElements = taskTree.filter(el => el.parent_id === parentId);
    return (
      <Box color={'brand.50'}>
        <Grid templateColumns='repeat(4, 1fr)' rowGap={1}>
          <GridItem><Text fontWeight='bold'>Name</Text> </GridItem>
          <GridItem><Text fontWeight='bold'>Created</Text></GridItem>
          <GridItem><Text fontWeight='bold'>No. Activities</Text></GridItem>

          <GridItem><Text fontWeight='bold'>Control</Text></GridItem>

            {rootElements.map((root) => (
              <TableElement
                key={root.id}
                node={root}
                elements={taskTree}
                deleteTask={deleteTask}
              />))}
        </Grid>
      </Box>
    )
  }
}
