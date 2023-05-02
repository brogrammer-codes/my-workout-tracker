import { deleteTask as deleteTaskApi, patchTask, postTask, fetchTaskTree, cloneTask, createSharedTask } from '@/utils/api';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export const useTask = () => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const [taskTree, setTaskTree] = useState([])
  const toast = useToast()

  const getTaskTree = async (task_id=null) => {
    setloading(true)
    await fetchTaskTree(task_id)
      .then(({task_tree}) => {
        setTaskTree(task_tree)
        setloading(false)
      })
      .catch((e) => {
        setError(e)
      }

      );
  };

  const addTask = async (task) => {
    setloading(true)
    await postTask(task)
      .then(({task}) => {
        if(task) setTaskTree([...taskTree, task])
        setloading(false)
        toast({
          title: `${task?.type} created`,
          description: `Successfully added ${task?.name}`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((e) => {
        setError(e)
      }

      );
  };

  const deleteTask = async (task_id) => {
    setloading(true)
    await deleteTaskApi({task_id})
    .then(() => {
        const newTaskTree = taskTree.filter((task) => task?.id !== task_id)
        if(newTaskTree) setTaskTree([...newTaskTree])
        setloading(false)
        toast({
          title: `Task Deleted`,
          description: `Successfully deleted task`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((e) => {
        setError(e)
      }

      );
  };

  const updateTask = async (task) => {
    await patchTask(task).then(({task}) => {
      const newTaskTree = taskTree.filter((e) => e?.id !== task?.id)
      setTaskTree([...newTaskTree, task])
      toast({
        title: `${task?.type} updated`,
        description: `Successfully updated ${task?.name}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }).catch((e) => setError(e))
  };

  const copyTask = async (task_id, parent_id=null) => {
    await cloneTask(task_id, parent_id).then(({task}) => {
      setTaskTree([...taskTree, task])
      toast({
        title: `${task?.type} coppied`,
        description: `Successfully cloned ${task?.name}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }).catch((e) => setError(e))
  };
  
  const copyTaskToShared = async (task_id) => {
    await createSharedTask(task_id,).then(({task}) => {
      toast({
        title: `${task?.type} shared`,
        description: `Successfully shared ${task?.name}, go to your profile page to see it!`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }).catch((e) => setError(e))
  }
  
  return { error, loading, getTaskTree, taskTree, addTask, updateTask, deleteTask, copyTask, copyTaskToShared }

}