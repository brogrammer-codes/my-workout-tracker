import React from 'react'
import { Button, Box, Link, Text, HStack, Tr, Input, IconButton, Tbody, Grid, GridItem, Container, Popover, PopoverTrigger, PopoverContent, Divider, } from '@chakra-ui/react';
import { CheckCircleIcon, SettingsIcon, Icon } from "@chakra-ui/icons";
import { HiVideoCamera } from 'react-icons/hi'
import { MdDescription } from 'react-icons/md'

import { DeleteTaskIcon } from '../DeleteTaskIcon';
import { TableControl } from './TableControl';
import { TASK_TAGS, TASK_TYPES } from '@/utils/constants';


const TableElement = ({ node, elements, depth, deleteTask, editActivity, isEditable }) => {
  const childElements = elements.filter(el => el.parent_id === node.id);
  // check node type here and render the correct list item
  if (node?.type === TASK_TYPES.ACTIVITY) {
    return (
      <>
        <GridItem>{node?.complete && <CheckCircleIcon color={'brandCard.50'} />} {node.name}</GridItem>
        {
          TASK_TAGS.map((tag) => (
            <GridItem>{node[tag]}</GridItem>
          ))
        }
        <GridItem>
          <TableControl>
            {node?.description && (
              <Popover>
                <PopoverTrigger>
                  <IconButton size="sm" icon={<Icon as={MdDescription} boxSize={5} />} colorScheme='brand' />

                </PopoverTrigger>
                <PopoverContent color='brand.50' bg={'brand.500'} padding={3}>
                  {node.description}
                </PopoverContent>
              </Popover>
            )
            }
            {node?.video_url && (<IconButton colorScheme='brand' aria-label='video-task-icon' size="sm" icon={<Icon as={HiVideoCamera} boxSize={5} />} as={Link} href={node.video_url} isExternal />)}
            {isEditable && (
              <>
                <IconButton colorScheme='brand' aria-label='edit-task-icon' size="sm" icon={<SettingsIcon boxSize={4} />} onClick={() => editActivity(node?.id)} />
                <DeleteTaskIcon onDelete={() => deleteTask(node?.id)} taskName={node?.name} />
              </>
            )}
          </TableControl>
        </GridItem>
        {childElements.map(child => (
          <GridItem key={child.id}>
            <TableElement key={child.id} node={child} elements={elements} addTask={addTask} depth={depth + 1} deleteTask={deleteTask} isEditable={isEditable} />
          </GridItem>
        ))}
        <GridItem colSpan={8}>
          <Divider />
        </GridItem>
      </>
    )
  }
}
export const ActivityTable = ({ taskTree, pageTask, deleteTask, editTask, updatePagePlan, editActivity, isEditable }) => {
  if (taskTree.length) {
    const rootElements = taskTree.filter(el => el.parent_id === pageTask?.id);
    return (
      <Box color={'brand.50'}>
        <Grid templateColumns='repeat(8, 1fr)' gap={2}>
          <GridItem colSpan={1}><Text fontWeight='bold'>Name</Text></GridItem>
          {
            TASK_TAGS.map((tag) => (
              <GridItem>
                <Input
                  variant='flushed'
                  value={pageTask[tag]}
                  onChange={(event) => updatePagePlan(tag, event.target.value)}
                  isDisabled={!editTask}
                  size={'sm'}
                />
              </GridItem>
            ))
          }
          <GridItem>{isEditable && <Text fontWeight='bold'>Actions</Text>}</GridItem>

          {rootElements.map((root) => (
            <TableElement
              key={root.id}
              node={root}
              elements={taskTree}
              deleteTask={deleteTask}
              editActivity={editActivity}
              depth={0}
              isEditable={isEditable}
            />))}
        </Grid>
      </Box>
    )
  }
}
