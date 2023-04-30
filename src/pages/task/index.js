import { useTask } from '@/hooks/api';
import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Button, Container, Center, Flex, useDisclosure, Text, Box, List, ListIcon, Spinner } from '@chakra-ui/react';
import { TaskModal } from '@/component/TaskModal/TaskModal';
import { TaskTree } from '@/component/TaskTree'
import { useRouter } from 'next/router';



const TaskListPage = () => {
  const { user, taskTree, getTaskTree, addTask, updateTask, deleteTask } = useTaskListContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newTaskParent, setNewTaskParent] = useState(null)
  const router = useRouter();

  useEffect(() => {
    if (user?.user) {
      getTaskTree()
    }
  }, [user, router])
  const createTask = (name, parent_id) => addTask(name, parent_id)
  const nodeAddTask = (parentTask) => {
    setNewTaskParent(parentTask)
    onOpen()
  }
  const closeTaskModal = () => {
    setNewTaskParent(null)
    onClose()
  }
  const updateComplete = (task_id, complete) => updateTask(task_id, complete)
  const handleDeleteTask = (task_id) => deleteTask(task_id)

  if (!user) return <Center h='100px'><Spinner /></Center >
  return (
    <Box py={4} px={8}>
      {taskTree && <TaskTree elements={taskTree} addTask={nodeAddTask}/>}
      <TaskModal isOpen={isOpen} onSubmit={createTask} onClose={closeTaskModal} parentTask={newTaskParent} />
    </Box>
  )
}
export default TaskListPage