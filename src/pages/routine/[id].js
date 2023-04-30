import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Button, Input, Center, Stack, useDisclosure, Text, Box, List, Heading, Spinner, Textarea, HStack, Grid, GridItem, Card, CardHeader, CardBody, SimpleGrid } from '@chakra-ui/react';
import { TaskModal } from '@/component/TaskModal/TaskModal';
import { useRouter } from 'next/router';
import { TASK_TYPES } from '@/utils/constants';
import { RoutineTable } from '@/component/TaskTable';
import { searchTypeWithKeyword } from '@/utils/api';
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';
const RoutinePage = () => {
  const { user, getTaskTree, taskTree, addTask, updateTask, deleteTask, copyTask } = useTaskListContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageRoutine, setPageRoutine] = useState(null)
  const [newSubTasks, setNewSubTasks] = useState([])
  const [editTask, setEditTask] = useState(false)
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if(isOpen) {
      searchTypeWithKeyword('plan').then(({task}) => setNewSubTasks([...task]))
    } else {
      setNewSubTasks([])
    }
  }, [isOpen])
  
  useEffect(() => {
    if (user?.user) {
      getTaskTree(id)
    }
  }, [user, router])
  useEffect(() => {
    setPageRoutine(taskTree.find((task) => task?.id === id))
  }, [taskTree])
  const editOnClick = () => {
    if (editTask) {
      saveRoutine();
    } else {
      setEditTask(true)
    }
  }
  const updatePageRoutine = (key, value) => {
    setPageRoutine((prev) => ({ ...prev, [key]: value }));
  };
  const saveRoutine = () => {
    updateTask(pageRoutine).then(() => setEditTask(false))
  }
  const createTask = (name, parent_id) => addTask(name, parent_id, id)
  const copyPlan = (task_id) => {
    copyTask(task_id, pageRoutine?.id).then(() => onClose())
    
  }
  if (!user || !pageRoutine || pageRoutine?.type !== TASK_TYPES.ROUTINE) return <Center h='100px'><Spinner /></Center >
  return (
    <Box color={'brand.50'}>
      <Stack direction={{ lg: 'row', base: 'column' }} spacing={1}>
      
      <Input variant='outline' value={pageRoutine?.name} onChange={(event) => updatePageRoutine('name', event.target.value)} isDisabled={!editTask} size={'lg'} />
      <Textarea
        value={pageRoutine.description}
        onChange={(event) => updatePageRoutine('description', event.target.value)}
        isDisabled={!editTask}
        size={'lg'}
      />
    </Stack>
      <HStack>
      <Button onClick={editOnClick} colorScheme='brand'> {editTask ? 'Save' : 'Edit'} {pageRoutine?.type}</Button>
        <Button onClick={isOpen ? onClose : onOpen} colorScheme='brand'>Add Plan</Button>
      </HStack>
      {
        newSubTasks.length ? (
          <SimpleGrid       
              columns={[1, null, 3]} 
              gap={2} 
              margin={5}
            > 
            {newSubTasks.map((task) =>( 
              <GridItem key={task?.id}>
                <Card bg={'brand.50'} height={'100%'}>
                  <CardHeader onClick={() => copyPlan(task?.id)} cursor={'pointer'}><Heading>{task.name}</Heading></CardHeader>
                  <CardBody>
                    <Text>{task?.description}</Text>
                    <Text>Created on: {moment(task?.inserted_at).format(dateFormatMonthDayTime)}</Text>
                  </CardBody>
                </Card>
                
              </GridItem>
            ))} 
          </SimpleGrid>
        ) : null
      }
      <RoutineTable taskTree={taskTree} parentId={id} pageTask={pageRoutine} deleteTask={deleteTask}/>
      {/* <TaskModal isOpen={isOpen} onSubmit={createTask} onClose={closeTaskModal} parentTask={!editTask && (newSubTask || pageTask)} currentTask={editTask && pageTask} /> */}
    </Box>
  )
}
export default RoutinePage