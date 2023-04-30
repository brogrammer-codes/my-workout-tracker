import React, { useState, useEffect } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { useTaskListContext } from '@/context/context'
import { TASK_TYPES } from '@/utils/constants';

const newPlan = {
  name: '',
  description: '',
  type: 'plan',
  complete: false,
  tag_1: '',
  tag_2: '',
  tag_3: '',
  tag_4: '',
  tag_5: '',
  tag_6: '',
}
const PlanModalForm = ({ currentPlan, parentTask, onClose }) => {
  const [plan, setPlan] = useState(currentPlan || newPlan);
  const { addTask, updateTask } = useTaskListContext()
  const updatePlan = (key, value) => {
    setPlan((prevPlan) => ({ ...prevPlan, [key]: value }));
  };
  useEffect(() => {
    setPlan({ ...plan, parent_id: parentTask?.id })
  }, [parentTask])
  useEffect(() => {
    if (currentPlan) setPlan({ ...currentPlan })
  }, [currentPlan])
  const createPlan = (event) => {
    event.preventDefault();
    addTask(plan, parentTask?.id).then(setPlan(newPlan)).finally(() => onClose())
  }
  const savePlan = (event) => {
    event.preventDefault();
    updateTask(plan).then(() => setPlan(newPlan)).finally(() => onClose())
  }
  const onDropDownClicked = (element) => {
    setPlan({...element, id: null})
    closePopover()
  }
  return (
    <Box as="form" color={'brand.50'}>
      <FormControl>
        <Heading>{currentPlan?.id ? <>Make changes to <Text as='kbd'>{currentPlan?.name}</Text></> : <>Create a new plan in <Text as='kbd'>{parentTask?.name}</Text></>}</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={3}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={plan.name}
              onChange={(event) => updatePlan('name', event.target.value)}
              />

          </GridItem>
          <GridItem colSpan={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={plan.description}
              onChange={(event) => updatePlan('description', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tag 1</FormLabel>
            <Input
              type="text"
              value={plan.tag_1}
              onChange={(event) => updatePlan('tag_1', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tag 2</FormLabel>
            <Input
              type="text"
              value={plan.tag_2}
              onChange={(event) => updatePlan('tag_2', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tag 3</FormLabel>
            <Input
              type="text"
              value={plan.tag_3}
              onChange={(event) => updatePlan('tag_3', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tag 4</FormLabel>
            <Input
              type="text"
              value={plan.tag_4}
              onChange={(event) => updatePlan('tag_4', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tag 5</FormLabel>
            <Input
              type="text"
              value={plan.tag_5}
              onChange={(event) => updatePlan('tag_5', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tag 6</FormLabel>
            <Input
              type="text"
              value={plan.tag_6}
              onChange={(event) => updatePlan('tag_6', event.target.value)}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Button colorScheme='brand' onClick={currentPlan ? savePlan : createPlan}>{currentPlan ? 'Save Plan' : 'Create Plan'}</Button>
          </GridItem>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default PlanModalForm;
