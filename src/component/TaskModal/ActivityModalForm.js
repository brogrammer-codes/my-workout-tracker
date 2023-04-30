import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  Heading,
  Grid,
  GridItem,
  VStack
} from '@chakra-ui/react';
import { useTaskListContext } from '@/context/context'
import { TASK_TYPES } from '@/utils/constants';
import { ActivityPicker } from './ActivityPicker';
const newActivity = {
  name: '',
  description: '',
  video_url: '',
  type: 'activity',
  complete: false,
  tag_1: '',
  tag_2: '',
  tag_3: '',
  tag_4: '',
  tag_5: '',
  tag_6: '',
}
const ActivityModalForm = ({ currentActivity, parentTask, onClose }) => {
  const [activity, setActivity] = useState(currentActivity || newActivity)
  const { addTask, updateTask } = useTaskListContext()

  useEffect(() => {
    setActivity({ ...activity, parent_id: parentTask?.id })
  }, [parentTask])
  useEffect(() => {
    if (currentActivity) setActivity({ ...currentActivity })
  }, [currentActivity])
  const updateActivity = (key, value) => {
    setActivity((prevAct) => ({ ...prevAct, [key]: value }));
  };
  const showActivityTags = () => {
    if (parentTask?.type === TASK_TYPES.FOLDER) return false
    return true
  }
  const createActivity = (event) => {
    event.preventDefault();
    addTask(activity).then(setActivity(newActivity)).finally(() => onClose())
  }
  const saveActivity = (event) => {
    event.preventDefault();
    updateTask(activity).then(() => setActivity(newActivity)).finally(() => onClose())
  }
  return (
    <Box as="form" color={'brand.50'}>
      <FormControl>
        <Heading>{currentActivity?.id ? <>Make changes to <Text as='kbd'>{currentActivity?.name}</Text></> : <>Create a new activity in <Text as='kbd'>{parentTask?.name}</Text></>}</Heading>
        <VStack>
          <FormLabel>Name</FormLabel>
          <ActivityPicker setActivity={setActivity} activity={activity}/>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={activity.description}
            onChange={(event) => updateActivity('description', event.target.value)}
          />
          <FormLabel>Video URL</FormLabel>
          <Input
            type="text"
            value={activity.video_url}
            onChange={(event) => updateActivity('video_url', event.target.value)}
          />
          {showActivityTags() && (<Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {parentTask?.tag_1 && (<GridItem colSpan={1}>
              <FormLabel>{parentTask?.tag_1}</FormLabel>
              <Input
                type="text"
                value={activity.tag_1}
                onChange={(event) => updateActivity('tag_1', event.target.value)}
              />
            </GridItem>)}
            {parentTask?.tag_2 && (<GridItem colSpan={1}>
              <FormLabel>{parentTask?.tag_2}</FormLabel>
              <Input
                type="text"
                value={activity.tag_2}
                onChange={(event) => updateActivity('tag_2', event.target.value)}
              />
            </GridItem>)}
            {parentTask?.tag_3 && (<GridItem colSpan={1}>
              <FormLabel>{parentTask?.tag_3}</FormLabel>
              <Input
                type="text"
                value={activity.tag_3}
                onChange={(event) => updateActivity('tag_3', event.target.value)}
              />
            </GridItem>)}
            {parentTask?.tag_4 && (<GridItem colSpan={1}>
              <FormLabel>{parentTask?.tag_4}</FormLabel>
              <Input
                type="text"
                value={activity.tag_4}
                onChange={(event) => updateActivity('tag_4', event.target.value)}
              />
            </GridItem>)}
            {parentTask?.tag_5 && (<GridItem colSpan={1}>
              <FormLabel>{parentTask?.tag_5}</FormLabel>
              <Input
                type="text"
                value={activity.tag_5}
                onChange={(event) => updateActivity('tag_5', event.target.value)}
              />
            </GridItem>)}
            {parentTask?.tag_6 && (<GridItem colSpan={1}>
              <FormLabel>{parentTask?.tag_6}</FormLabel>
              <Input
                type="text"
                value={activity.tag_6}
                onChange={(event) => updateActivity('tag_6', event.target.value)}
              />
            </GridItem>)}

          </Grid>)}
          <Button colorScheme='facebook' onClick={currentActivity ? saveActivity : createActivity}>{currentActivity ? 'Save activity' : 'Create activity'}</Button>

        </VStack>
      </FormControl>
    </Box>
  )
}

export default ActivityModalForm