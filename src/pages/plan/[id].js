
import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Button, Input, Center, Flex, useDisclosure, Box, Spinner, Textarea, Stack, Heading } from '@chakra-ui/react';
import { TaskModal } from '@/component/TaskModal/TaskModal';
import { useRouter } from 'next/router';
import { TASK_TYPES } from '@/utils/constants';
import { PlanTable } from '@/component/TaskTable';
import { CheckCircleIcon } from "@chakra-ui/icons";

const PlanPage = () => {
  const { user, getTaskTree, taskTree, updateTask, addTask, deleteTask, taskLoading } = useTaskListContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageTask, setPageTask] = useState(null)
  const [modalActivity, setModalActivity] = useState(null)
  const [editTask, setEditTask] = useState(false)
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (user?.user) {
      getTaskTree(id)
    }
  }, [user, router])
  useEffect(() => {
    setPageTask(taskTree.find((task) => task?.id === id))
  }, [taskTree])
  const createTask = (name, parent_id) => addTask(name, parent_id, id)

  const closeTaskModal = () => {
    setEditTask(false)
    onClose()
  }
  const nodeAddTask = (parentTask) => {
    setNewSubTask(parentTask)
    onOpen()
  }
  const updatePagePlan = (key, value) => {
    setPageTask((prevPlan) => ({ ...prevPlan, [key]: value }));
  };
  const savePlan = () => {
    updateTask(pageTask).then(() => setEditTask(false))
  }
  const editOnClick = () => {
    if (editTask) {
      savePlan();
    } else {
      setEditTask(true)
    }
  }
  const editActivity = (activity_id) => {
    setModalActivity(taskTree.find((task) => task?.id === activity_id))
    onOpen()
  }
  if (!user || !pageTask || pageTask?.type !== TASK_TYPES.PLAN) return <Center h='100px'><Spinner /></Center >
  return (
    <Box color={'brand.50'}>
      <Heading>Plan {pageTask?.complete && (<CheckCircleIcon color={'brandCard.50'} />)}</Heading>
      <Stack direction={{ lg: 'row', base: 'column' }} spacing={1}>

        <Input variant='outline' value={pageTask?.name} onChange={(event) => updatePagePlan('name', event.target.value)} isDisabled={!editTask} size={'lg'} />
        <Textarea
          value={pageTask.description}
          onChange={(event) => updatePagePlan('description', event.target.value)}
          isDisabled={!editTask}
          size={'lg'}
        />
      </Stack>
      <Stack direction={{ lg: 'row', base: 'column' }}>

        <Button onClick={editOnClick} colorScheme='brand' isLoading={taskLoading} isDisabled={pageTask?.complete || taskLoading}> {editTask ? 'Save' : 'Edit'} {pageTask?.type}</Button>
        <Button onClick={onOpen} colorScheme='brand'  isLoading={taskLoading} isDisabled={pageTask?.complete || taskLoading}>Add Activity</Button>
        <Button onClick={() => router.push(`/plan/workout/${id}`)} colorScheme='brand' isLoading={taskLoading} isDisabled={taskLoading}>Workout with Plan</Button>
      </Stack>
      <PlanTable taskTree={taskTree} parentId={id} pageTask={pageTask} deleteTask={deleteTask} updatePagePlan={updatePagePlan} editTask={editTask} editActivity={editActivity} />
      <TaskModal isOpen={isOpen} onSubmit={createTask} onClose={closeTaskModal} parentTask={pageTask} currentTask={modalActivity} />
    </Box>
  )
}
export default PlanPage