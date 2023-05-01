import React, { useState } from 'react';
import { Button, Box, ListItem, Link, Text, HStack, List, ListIcon, IconButton } from '@chakra-ui/react';
import { CheckCircleIcon, AddIcon, ChevronRightIcon, ChevronDownIcon, ExternalLinkIcon, DeleteIcon, Icon } from "@chakra-ui/icons";
import { TASK_TYPES } from '@/utils/constants';
import { capitalizeString } from '@/utils/formats';

import {HiChevronDoubleDown, HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'


const TaskNode = ({ node, elements, addTask, depth }) => {
  const childElements = elements.filter(el => el.parent_id === node.id);
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem style={{ paddingLeft: (depth * 10) }}>
      <HStack>
        {childElements.length > 0 && (
          <Button size="xs" ml={2} onClick={() => setExpanded(!expanded)} colorScheme='brand'>
            {expanded ? <Icon as={HiChevronDoubleDown} /> : <Icon as={HiChevronDoubleRight} />}
          </Button>
        )}
        {/* <Text ml={2} color={'brand.50'}>{depth > 1 && `${capitalizeString(node?.type)}: `} {capitalizeString(node.name)}</Text> */}
        {node?.type !== TASK_TYPES.ACTIVITY ?
        <Link aria-label='open-task-icon' href={`/${node?.type}/${node?.id}`}><Text ml={2} color={'brand.50'}>{depth > 1 && `${capitalizeString(node?.type)}: `} {capitalizeString(node.name)}</Text></Link>:
          <Text ml={2} color={'brand.50'}>{depth > 1 && `${capitalizeString(node?.type)}: `} {capitalizeString(node.name)}</Text>
        }

      </HStack>
      {expanded && (<List spacing={2}>
        {childElements.map(child => (
          <TaskNode key={child.id} node={child} elements={elements} depth={depth + 1}  />
        ))}
      </List>)}
    </ListItem>
  )
}

export const TaskTree = ({ elements, parentId = null, }) => {
  if (elements && elements.length) {

    const rootElements = elements.filter(el => el.parent_id === parentId);
    return (
      <Box>
        <List spacing={5}>
          {rootElements.map((root) => (
            <TaskNode
              key={root.id}
              node={root}
              elements={elements}
              depth={0}
            />))}
        </List>
      </Box>
    )
  }
}