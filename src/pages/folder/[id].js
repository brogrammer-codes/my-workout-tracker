import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Button, Center, Flex, useDisclosure, Text, Box, List, Heading, Spinner, VStack } from '@chakra-ui/react';
import { TaskModal } from '@/component/TaskModal/TaskModal';
import { TaskTree } from '@/component/TaskTree'
import { useRouter } from 'next/router';
import { TASK_TYPES, getPossibleSubtask } from '@/utils/constants';
import PageLoading from '@/component/PageLoading';
import { FolderTable } from '@/component/TaskTable/FolderTable';
import { capitalizeString } from '@/utils/formats';

const FolderPage = () => {
  const { user, getTaskTree, taskTree, addTask, updateTask, deleteTask, copyTask } = useTaskListContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageTask, setNewTaskParent] = useState(null)
  const [newSubTask, setNewSubTask] = useState(null)
  const [editTask, setEditTask] = useState(false)
  const router = useRouter();
  const { id } = router.query;
  const fodlerSubtask = getPossibleSubtask(pageTask)
  useEffect(() => {
    if (user?.user) {
      getTaskTree(id)
    }
  }, [user, router])
  useEffect(() => {
    setNewTaskParent(taskTree.find((task) => task?.id === id))
  }, [taskTree])

  const createTask = () => {
    addTask({ name: '', type: fodlerSubtask, parent_id: id })
  }

  const closeTaskModal = () => {
    setNewSubTask(null)
    onClose()
  }
  const editActivity = (activity_id) => {
    setNewSubTask(taskTree.find((task) => task?.id === activity_id))
    onOpen()
  }

  const copyPlan = (task_id) => {
    copyTask(task_id)

  }
  // if (!user || !pageTask) return <Center h='100px'><Spinner /></Center >
  return (
    <PageLoading isLoading={(!user || !pageTask)}>

      <Box color={'brand.50'}>
        <VStack alignItems={'flex-start'}>
          <Heading>{capitalizeString(pageTask?.name)}</Heading>
          <Text>{pageTask?.description}</Text>
          <Button mb={4} onClick={fodlerSubtask === TASK_TYPES.ACTIVITY ? onOpen : createTask} colorScheme='brand'>Create {fodlerSubtask}</Button>
        </VStack>
        {
          taskTree && (<FolderTable taskTree={taskTree} parentId={id} pageTask={pageTask} deleteTask={deleteTask} editActivity={editActivity} copyPlan={copyPlan} />)
        }
        <TaskModal isOpen={isOpen} onSubmit={createTask} onClose={closeTaskModal} parentTask={!editTask && (newSubTask || pageTask)} currentTask={newSubTask} />
      </Box>
    </PageLoading>
  )
}


export default FolderPage