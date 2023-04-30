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
  GridItem
} from '@chakra-ui/react';
import { useTaskListContext } from '@/context/context'

const newRoutine = {
  name: '',
  description: '',
  type: 'routine',
  complete: false,
}
const RoutineModalForm = ({ currentRoutine, parentTask, onClose }) => {
  const [routine, setRoutine] = useState(currentRoutine || newRoutine);
  const { addTask, updateTask } = useTaskListContext()
  const updateRoutine = (key, value) => {
    setRoutine((prevRoutine) => ({ ...prevRoutine, [key]: value }));
  };
  useEffect(() => {
    setRoutine({ ...routine, parent_id: parentTask?.id })
  }, [parentTask])
  useEffect(() => {
    if(currentRoutine) setRoutine({ ...currentRoutine })
  }, [currentRoutine])
  const createRoutine = (event) => {
    event.preventDefault();
    addTask(routine, parentTask?.id).then(setRoutine(newRoutine)).finally(() => onClose()) 
  }
  const saveRoutine = (event) => {
    event.preventDefault();
    updateTask(routine).then(() =>setRoutine(newRoutine)).finally(() => onClose())
  }
  return (
    <Box as="form" color={'brand.50'}>
      <FormControl>
        <Heading>{currentRoutine?.id ? <>Make changes to <Text as='kbd'>{currentRoutine?.name}</Text></> : <Text>Create a new routine</Text>}</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={3}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={routine.name}
              onChange={(event) => updateRoutine('name', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={routine.description}
              onChange={(event) => updateRoutine('description', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Button onClick={currentRoutine ? saveRoutine : createRoutine}>{currentRoutine ? 'Save Routine' : 'Create Routine'}</Button>
          </GridItem>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default RoutineModalForm;
