import React, { useState } from 'react';
import { Button, Box, ListItem, Link, Text, HStack, List, ListIcon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { CheckCircleIcon, AddIcon, ChevronRightIcon, ChevronDownIcon, ExternalLinkIcon, DeleteIcon, Icon } from "@chakra-ui/icons";
import { TASK_TYPES } from '@/utils/constants';
import { capitalizeString } from '@/utils/formats';

import { HiChevronDoubleDown, HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'


const TaskNode = ({ node, elements, addTask, depth }) => {
  const childElements = elements.filter(el => el.parent_id === node.id);
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <HStack>
        {childElements.length > 0 && (
          <Button size="xs" ml={2} onClick={() => setExpanded(!expanded)} colorScheme='brand'>
            {expanded ? <Icon as={HiChevronDoubleDown} /> : <Icon as={HiChevronDoubleRight} />}
          </Button>
        )}
        {/* <Text ml={2} color={'brand.50'}>{depth > 1 && `${capitalizeString(node?.type)}: `} {capitalizeString(node.name)}</Text> */}
        {node?.type !== TASK_TYPES.ACTIVITY ?
          <Link aria-label='open-task-icon' href={`/${node?.type}/${node?.id}`}><Text ml={2} color={'brand.50'}>{depth > 1 && `${capitalizeString(node?.type)}: `} {capitalizeString(node.name)}{node?.complate && '(complete)'}</Text></Link> :
          <Text ml={2} color={'brand.50'}>{depth > 1 && `${capitalizeString(node?.type)}: `} {capitalizeString(node.name)} {node?.complate && '(complete)'}</Text>
        }

      </HStack>
      {
        expanded && (<List spacing={2}>
          {childElements.map(child => (
            <TaskNode key={child.id} node={child} elements={elements} depth={depth + 1} />
          ))}
        </List>)
      }
    </>
  )
}

export const TaskTree = ({ elements, parentId = null, }) => {
  if (elements && elements.length) {

    const rootElements = elements.filter(el => el.parent_id === parentId);
    return (
      <Box display={'flex'} justifyContent={'center'} width={'full'}>
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          {rootElements.map((root) => (
            <Box w={'full'} height={'230px'} key={root.id} bg={'brand.900'}>
              <TaskNode
                node={root}
                elements={elements}
                depth={0}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    )
  }
}