import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTaskListContext } from '@/context/context';
import { Card, Box, Heading, Text, HStack, Container, Input, Link, Flex, SimpleGrid, Checkbox, CardHeader, CardBody, IconButton } from '@chakra-ui/react';
import { AddInput } from '@/component/AddInput';
import { TASK_TAGS } from '@/utils/constants';
import { Icon, LinkIcon } from "@chakra-ui/icons";
import {HiVideoCamera, HiArrowLeft} from 'react-icons/hi'
import {IoMdReturnLeft} from 'react-icons/io'

const WorkoutCard = ({ parentTask, task, taskTree, completeActivity }) => {
  const [cardActivity, setCardActivity] = useState(task)
  const [showDescription, setShowDescription] = useState(false)
  const updateCardActivity = (key, value) => {
    setCardActivity({ ...cardActivity, [key]: value })
  }
  return (
    <Card margin={3} padding={2} maxW={'sm'} bg={task?.complete ? 'brandCard.50' : 'brandCard.200'}>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Text cursor={'pointer'} as={'b'} onClick={() => setShowDescription((prev) => !prev)} fontSize={'xl'}>{cardActivity?.name}</Text>
            {task?.video_url && (<Link isExternal href={task.video_url}><Icon as={HiVideoCamera} boxSize={7}/>  </Link>)}
          </Flex>
          <Checkbox isChecked={task?.complete} isDisabled={task?.complete} onChange={() => completeActivity(cardActivity)} />
        </Flex>
      </CardHeader>
      <CardBody>

        {showDescription && (<Text fontSize={'xs'}>{task?.description}</Text>)}
        <SimpleGrid columns={2} spacing={1} width={'70%'}>
          {
            TASK_TAGS.map((tag) => {
              if (parentTask[tag]) {
                return (
                  <>
                    <Text as={'b'}>{parentTask[tag]}</Text>
                    <Input value={cardActivity[tag]} isDisabled={task?.complete} onChange={(event) => updateCardActivity([tag], event.target.value)} />
                  </>
                )
              }
            })
          }
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}

const WorkoutPage = () => {
  const { user, getTaskTree, taskTree, addTask, updateTask, deleteTask } = useTaskListContext()
  const [pageTask, setPageTask] = useState(null)
  const [pageTaskTree, setPageTaskTree] = useState([])

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (user?.user) {
      getTaskTree(id)
    }
  }, [user, router])
  useEffect(() => {
    setPageTask(taskTree.find((task) => task?.id === id))
    setPageTaskTree(taskTree.filter((task) => task?.id !== id))
  }, [taskTree])
  // console.log(pageTaskTree, pageTask);
  const completeActivity = (task) => {
    const completeTask = { ...task, complete: true }
    updateTask(completeTask).then(() => console.log(completeTask))

  }
  return (
    <Container color={'brand.50'}>
      <IconButton as={IoMdReturnLeft} variant={'ghost'} colorScheme='brandCard' onClick={() => router.push(`/plan/${pageTask?.id}`)}/>
      <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Heading>{pageTask?.name}</Heading>
      <Text>{pageTask?.description}</Text>
          </Flex>
          <Checkbox isChecked={pageTask?.complete} isDisabled={pageTask?.complete} onChange={() => completeActivity(pageTask)} />
        </Flex>
      
      
      {
        pageTaskTree.map((task) => <WorkoutCard key={task?.id} parentTask={pageTask} task={task} taskTree={pageTaskTree} completeActivity={completeActivity} />)
      }
    </Container>
  )
}


export default WorkoutPage