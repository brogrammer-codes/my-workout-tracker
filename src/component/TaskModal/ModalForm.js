import PlanModalForm from './PlanModalForm'
import { TASK_TYPES, getPossibleSubtask } from '@/utils/constants'
import { Box, } from '@chakra-ui/react'
import ActivityModalForm from './ActivityModalForm'
import RoutineModalForm from './RoutineModalForm'

const ModalForm = ({ onClose, currentTask, parentTask }) => {
  const taskType = currentTask?.type || getPossibleSubtask(parentTask)
  switch (taskType) {
    case TASK_TYPES.ROUTINE:
      return <RoutineModalForm currentRoutine={currentTask} parentTask={parentTask} onClose={onClose} />
    case TASK_TYPES.PLAN:
      return <PlanModalForm currentPlan={currentTask} parentTask={parentTask} onClose={onClose} />
    case TASK_TYPES.ACTIVITY:
      return <ActivityModalForm currentActivity={currentTask} parentTask={parentTask} onClose={onClose} />
    case TASK_TYPES.TASK:
      return <Box>Add an task  {parentTask?.name}</Box>
    case TASK_TYPES.SUPERSET:
      return <Box>Add an activity to superset: {parentTask?.name}</Box>
    default:
      break;
  }

}
export default ModalForm