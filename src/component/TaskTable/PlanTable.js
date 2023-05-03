import React from 'react'
import { Button, Box, Link, Text, HStack, Tr, Input, TableContainer, Table, IconButton, Tbody, Grid, GridItem, Container, Popover, PopoverTrigger, PopoverContent, } from '@chakra-ui/react';
import { CheckCircleIcon, SettingsIcon, ChevronRightIcon, ChevronDownIcon, Icon, DeleteIcon } from "@chakra-ui/icons";
import { HiVideoCamera } from 'react-icons/hi'
import { MdDescription } from 'react-icons/md'

import { getPossibleSubtask } from '@/utils/constants';


const TableElement = ({ node, elements, depth, deleteTask, editActivity, isEditable }) => {
  const childElements = elements.filter(el => el.parent_id === node.id);
  // check node type here and render the correct list item

  return (
    <>
      <GridItem>{node?.complete && <CheckCircleIcon color={'brandCard.50'} />} {node.name}</GridItem>
      <GridItem>{node?.tag_1}</GridItem>
      <GridItem>{node?.tag_2}</GridItem>
      <GridItem>{node?.tag_3}</GridItem>
      <GridItem>{node?.tag_4}</GridItem>
      <GridItem>{node?.tag_5}</GridItem>
      <GridItem>{node?.tag_6}</GridItem>
      <GridItem>
        <HStack >
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
              <IconButton colorScheme='brand' aria-label='edit-task-icon' size="sm" icon={<SettingsIcon boxSize={4}/>} onClick={() => editActivity(node?.id)} />
              <IconButton colorScheme='red' aria-label='delete-task-icon' size="sm" icon={<DeleteIcon boxSize={4}/>} onClick={() => deleteTask(node?.id)} />
            </>
          )}
          {/* {node?.video_url && (<Link isExternal href={node.video_url}><Icon as={HiVideoCamera} boxSize={7} />  </Link>)} */}
        </HStack>
      </GridItem>
      {childElements.map(child => (
        <GridItem key={child.id}>
          <TableElement key={child.id} node={child} elements={elements} addTask={addTask} depth={depth + 1} deleteTask={deleteTask} isEditable={isEditable} />
        </GridItem>
      ))}
    </>
  )
}
export const PlanTable = ({ taskTree, parentId, pageTask, deleteTask, editTask, updatePagePlan, editActivity, isEditable }) => {
  if (taskTree.length) {
    const rootElements = taskTree.filter(el => el.parent_id === pageTask?.id);
    return (
      <Box color={'brand.50'}>
        <Grid templateColumns='repeat(8, 1fr)' gap={2}>
          <GridItem colSpan={1}>Name</GridItem>
          <GridItem>
            <Input
              variant='flushed'
              value={pageTask?.tag_1}
              onChange={(event) => updatePagePlan('tag_1', event.target.value)}
              isDisabled={!editTask}
              size={'sm'}
            />
          </GridItem>
          <GridItem>
            <Input
              variant='flushed'
              value={pageTask?.tag_2}
              onChange={(event) => updatePagePlan('tag_2', event.target.value)}
              isDisabled={!editTask}
              size={'sm'}
            />

          </GridItem>
          <GridItem>
            <Input
              variant='flushed'
              value={pageTask?.tag_3}
              onChange={(event) => updatePagePlan('tag_3', event.target.value)}
              isDisabled={!editTask}
              size={'sm'}
            />
          </GridItem>
          <GridItem>
            <Input
              variant='flushed'
              value={pageTask?.tag_4}
              onChange={(event) => updatePagePlan('tag_4', event.target.value)}
              isDisabled={!editTask}
              size={'sm'}
            />
          </GridItem>
          <GridItem>
            <Input
              variant='flushed'
              value={pageTask?.tag_5}
              onChange={(event) => updatePagePlan('tag_5', event.target.value)}
              isDisabled={!editTask}
              size={'sm'}
            />
          </GridItem>
          <GridItem>
            <Input
              variant='flushed'
              value={pageTask?.tag_6}
              onChange={(event) => updatePagePlan('tag_6', event.target.value)}
              isDisabled={!editTask}
              size={'sm'}
            />
          </GridItem>
          <GridItem>{isEditable && 'Actions'}</GridItem>
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
