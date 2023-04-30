import React from 'react'
import { Button, Box, Td, Link, Text, HStack, Th, Tr, Thead, TableContainer, Table, TableCaption, Tbody } from '@chakra-ui/react';
import { TASK_TYPES, getPageType } from '@/utils/constants';
import { PlanTable } from './PlanTable';
import { RoutineTable } from './RoutineTable';
import { FolderTable } from './FolderTable';


const TableElement = ({ node, elements, depth}) => {
  const childElements = elements.filter(el => el.parent_id === node.id);
  // check node type here and render the correct list item
  return (
    <Tr>
        <Td>{node.name}</Td>
            <Td>{node?.tag_1}</Td>
            <Td>{node?.tag_2}</Td>
            <Td>{node?.tag_3}</Td>
            <Td>{node?.tag_4}</Td>
            <Td>{node?.tag_5}</Td>
            <Td>{node?.tag_6}</Td>
            {/* <IconButton aria-label='add-task-icon' size="xs" onClick={() => addTask(node)} icon={<AddIcon />} />
        <IconButton aria-label='open-task-icon' size="xs" icon={<ExternalLinkIcon />} as={Link} href={`/task/${node?.id}`} /> */}

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
    const rootElement = taskTree.find(el => el.parent_id === parentId);
    switch (pageTask?.type) {
      case TASK_TYPES.PLAN:
        return <PlanTable taskTree={taskTree} parentId={parentId} pageTask={pageTask}/>
      case TASK_TYPES.ROUTINE:
        return <RoutineTable taskTree={taskTree} parentId={parentId} pageTask={pageTask}/>
        case TASK_TYPES.FOLDER:
        return <FolderTable taskTree={taskTree} parentId={parentId} pageTask={pageTask}/>
        
      default:
        return <Box>Something went wrong</Box>;
    }
    // return (
    //   <TableContainer color={'brand.50'}>
    //     <Table variant='simple'>
    //       <TableCaption>{pageTask?.description}</TableCaption>
    //       <Thead>
    //         <Tr>
    //           <Th>Name</Th>
    //         <Th>{pageTask?.tag_1}</Th>
    //         <Th>{pageTask?.tag_2}</Th>
    //         <Th>{pageTask?.tag_3}</Th>
    //         <Th>{pageTask?.tag_4}</Th>
    //         <Th>{pageTask?.tag_5}</Th>
    //         <Th>{pageTask?.tag_6}</Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody>

    //       {rootElements.map((root) => (
    //         <TableElement
    //         key={root.id}
    //         node={root}
    //         elements={rootElements}
    //         depth={0}
    //         />))}
    //         </Tbody>
    //     </Table>
    //   </TableContainer>
    // )
  }
}
