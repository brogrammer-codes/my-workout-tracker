import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Button, Center, Flex, useDisclosure, Text, Box, List, Heading, Spinner } from '@chakra-ui/react';
import { TaskModal } from '@/component/TaskModal/TaskModal';
import { TaskTree } from '@/component/TaskTree'
import { useRouter } from 'next/router';
import { TASK_TYPES, getPossibleSubtask } from '@/utils/constants';
import { TaskTable } from '@/component/TaskTable';

const TaskSubTree = () => {
  const { user, getTaskTree, taskTree, addTask, updateTask, deleteTask } = useTaskListContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageTask, setNewTaskParent] = useState(null)
  const [newSubTask, setNewSubTask] = useState(null)
  const [editTask, setEditTask] = useState(false)
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (user?.user) {
      getTaskTree(id)
    }
  }, [user, router])
  useEffect(() => {
    setNewTaskParent(taskTree.find((task) => task?.id === id))
  }, [taskTree])

  const createTask = (name, parent_id) => addTask(name, parent_id, id)

  const closeTaskModal = () => {
    setNewSubTask(null)
    setEditTask(false)
    onClose()
  }
  const nodeAddTask = (parentTask) => {
    setNewSubTask(parentTask)
    onOpen()
  }
  const handleDeleteTask = (task_id) => deleteTask(task_id)
  if (!user || !pageTask) return <Center h='100px'><Spinner /></Center >
  return (
    <Box py={4} px={8} minHeight={'500'}>
      <Flex>
        <Heading>{pageTask?.type}: {pageTask?.name}</Heading>
        <Button mb={4} onClick={onOpen} colorScheme='brand'>Create {getPossibleSubtask(pageTask)}</Button>
        {pageTask?.type !== TASK_TYPES.FOLDER && <Button mb={4} onClick={()=> {setEditTask(true); onOpen()}} colorScheme='brand'>Edit {pageTask?.type}</Button>}
      </Flex>
      {
        // pageTask?.type === TASK_TYPES.PLAN && taskTree && (<TaskTable taskTree={taskTree} parentId={id} pageTask={pageTask}/>)
        taskTree && (<TaskTable taskTree={taskTree} parentId={id} pageTask={pageTask}/>)
      }
      {taskTree && <TaskTree elements={taskTree} addTask={nodeAddTask} parentId={id} deleteTask={handleDeleteTask}/>}
      <TaskModal isOpen={isOpen} onSubmit={createTask} onClose={closeTaskModal} parentTask={!editTask && (newSubTask || pageTask)} currentTask={editTask && pageTask}/>
    </Box>
  )
}


export default TaskSubTree