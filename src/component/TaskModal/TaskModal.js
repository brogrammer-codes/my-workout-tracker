import { useTaskListContext } from '@/context/context'
import { TASK_TYPES } from '@/utils/constants'
import { Modal, ModalContent, ModalOverlay, Input, Button, ModalBody, ModalHeader, Text, Box, Textarea, ModalCloseButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import ModalForm from './ModalForm'

const newTask = {
  name: '',
  type: TASK_TYPES.TASK,
  description: '',
  complete: false,
  parent_id: null,
}

export const TaskModal = ({ isOpen, onClose, currentTask, parentTask }) => {
  const [taskModal, setTaskModal] = useState(newTask)
  const { addTask, updateTask } = useTaskListContext()
  useEffect(() => {
    setTaskModal({ ...taskModal, parent_id: parentTask?.id })
  }, [parentTask])
  useEffect(() => {
    if(currentTask) setTaskModal({ ...currentTask })
  }, [currentTask])

  const updateTaskModal = (value, key) => {
    setTaskModal({ ...taskModal, [key]: value })
  }
  const createTask = () => {
    addTask(taskModal, parentTask?.id)
    setTaskModal(newTask)
    onClose()
  }
  const saveTask = () => {
    updateTask(taskModal)
    setTaskModal(newTask)
    onClose()
  }

  return (

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent overflow={'scroll'}  bgColor={'brand.500'} padding={'10'}>
        <ModalCloseButton />
        <ModalBody >
          <ModalForm currentTask={currentTask} parentTask={parentTask} onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}