import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Button, Input, Stack, useDisclosure, Text, Heading, Textarea, HStack, Grid, GridItem, Card, CardHeader, CardBody, SimpleGrid, Fade, Collapse } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { TASK_TYPES } from '@/utils/constants';
import { PlanTable } from '@/component/TaskTable';
import { searchTypeWithKeyword } from '@/utils/api';

import PageLoading from '@/component/PageLoading';
import Link from 'next/link';
import { PlanCard } from '@/component/PlanCard';


const RoutinePage = () => {
  const { user, getTaskTree, taskTree, addTask, updateTask, deleteTask, copyTask, taskLoading } = useTaskListContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageRoutine, setPageRoutine] = useState(null)
  const [newSubTasks, setNewSubTasks] = useState([])
  const [completePlans, setCompletePlans] = useState([])
  const [upcomingPlans, setUpcomingPlans] = useState([])
  const [editTask, setEditTask] = useState(false)
  const router = useRouter();
  const { id } = router.query;
  const newPlan = {name: 'New Plan', type: TASK_TYPES.PLAN, parent_id: pageRoutine?.id}
  

  useEffect(() => {
    if (user?.user) {
      getTaskTree(id)
    }
  }, [user, router])
  const openPlanSelect = () => {
    searchTypeWithKeyword('plan').then(({ task }) => setNewSubTasks([...task])).then(onOpen)
  }
  useEffect(() => {
    let pageRoutine = null
    let completePlans = []
    let upcomingPlans = []
    taskTree.forEach((task) => {
      if (task?.id === id) {
        pageRoutine = task
      } else if (task?.complete) {
        completePlans = [...completePlans, task]
      } else {
        upcomingPlans = [...upcomingPlans, task]
      }
    });
    setCompletePlans([...completePlans])
    setUpcomingPlans([...upcomingPlans])
    setPageRoutine({ ...pageRoutine })

  }, [id, taskTree])
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
  const copyPlan = (task_id) => {
    copyTask(task_id, pageRoutine?.id).then(() => onClose())

  }
  const createNewPlan = () => {
    addTask(newPlan).then(() => onClose())
  }
  return (
    <PageLoading isLoading={(!user || !pageRoutine || pageRoutine?.type !== TASK_TYPES.ROUTINE)}>
      <Text as={Link} href={`/folder/${pageRoutine?.parent_id}`}>Return to Folder</Text>
      <Heading>Routine</Heading>
      <Stack direction={{ lg: 'row', base: 'column' }} spacing={1}>

        <Input variant='outline' value={pageRoutine?.name} onChange={(event) => updatePageRoutine('name', event.target.value)} isDisabled={!editTask} size={'lg'} />
        <Textarea
          value={pageRoutine?.description}
          onChange={(event) => updatePageRoutine('description', event.target.value)}
          isDisabled={!editTask}
          size={'lg'}
        />
      </Stack>
      <HStack>
        <Button onClick={editOnClick} colorScheme='brand'> {editTask ? 'Save' : 'Edit'} {pageRoutine?.type}</Button>
        <Button onClick={isOpen ? onClose : openPlanSelect} colorScheme='brand'>{isOpen ? 'Close' : 'Add Plan'}</Button>
      </HStack>
      <Collapse in={isOpen}>
        <SimpleGrid
          columns={[1, null, 3]}
          gap={2}
          margin={5}
          maxW={1000}
        >
          <PlanCard plan={newPlan} loading={taskLoading} onClick={createNewPlan}/>
          {newSubTasks.map((task) => (
            <GridItem key={task?.id}>
              <PlanCard plan={task} loading={taskLoading} onClick={copyPlan}/>

            </GridItem>
          ))}
        </SimpleGrid>

      </Collapse>
      <Heading size={'md'}>Upcoming Plans</Heading>
      <PlanTable taskTree={upcomingPlans} parentId={id} pageTask={pageRoutine} deleteTask={deleteTask} />
      <Heading size={'md'}>Complete Plans</Heading>
      <PlanTable taskTree={completePlans} parentId={id} pageTask={pageRoutine} deleteTask={deleteTask} />

    </PageLoading>
  )
}
export default RoutinePage