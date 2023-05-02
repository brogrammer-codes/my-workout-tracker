import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, Text, Stack, Flex, Spinner, Grid, GridItem, SimpleGrid, Spacer } from '@chakra-ui/react';
import { TaskTree } from '@/component/TaskTree';
import { useTaskListContext } from '@/context/context';
import { ActivityPicker } from '@/component/TaskModal/ActivityPicker';
import PageLoading from '@/component/PageLoading';
import { TASK_TYPES } from '@/utils/constants';
import { PlanTable } from '@/component/TaskTable';
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';

const ProfilePage = () => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [pageProfile, setPageProfile] = useState(null)
  const [sharedPlans, setSharedPlans] = useState([])
  const [sharedAct, setSharedAct] = useState([])
  const { getProfiles, profiles, user, userLoading, logoutUser, updateUserProfile } = useTaskListContext()
  const { id } = router.query;
  useEffect(() => {
    if (user && user?.user?.id === id) {
      setIsEditable(true)
      setPageProfile({ ...user?.profile })
    }
    else if (profiles.length) {
      const currentProfile = profiles.find((profile) => profile?.id === id)
      setPageProfile({ ...currentProfile })
    } else {
      getProfiles()
    }

  }, [id, profiles, user])
  useEffect(() => {
    if (pageProfile && pageProfile?.shared_tasks?.length) {
      const currentPlans = pageProfile?.shared_tasks.filter((task) => task?.parent_id === null)
      const currentAct = pageProfile?.shared_tasks.filter((task) => task?.type === TASK_TYPES.ACTIVITY)
      setSharedPlans([...currentPlans])
      setSharedAct([...currentAct])
    }

    return () => {
      setSharedPlans([])
      setSharedAct([])
    }
  }, [pageProfile])

  const updateProfile = (key, value) => setPageProfile({ ...profile, [key]: value })
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateUserProfile(pageProfile);
  }
  return (
    <PageLoading isLoading={!pageProfile}>
      <Box justifyContent={'center'} p="4" color={'brand.50'}>
        <Heading mb="4">Account Details</Heading>
        <form onSubmit={handleSubmit}>
          <Box mb="4">
            <Text>Username</Text>
            <Input isDisabled={!isEditable} value={pageProfile?.username} onChange={event => updateProfile('username', event.target.value)} placeholder="Username" />
          </Box>
          {isEditable &&
            <Box mb="4">
              <Text>Full Name</Text>
              <Input value={pageProfile?.full_name} onChange={event => updateProfile('full_name', event.target.value)} placeholder="Full Name" />
            </Box>
          }
          <Box mb="4">
            <Text>Website</Text>
            <Input isDisabled={(!isEditable || !pageProfile)} value={pageProfile?.website} onChange={event => updateProfile('website', event.target.value)} placeholder="Website" />
          </Box>
          <Text>Favorite Activity</Text>
          <ActivityPicker isDisabled={!isEditable} activity={{ name: pageProfile?.favorite_activity }} setActivity={(activity) => updateProfile('favorite_activity', activity?.name)} />
          {isEditable &&
            <Stack spacing={2}>

              <Button type="submit" colorScheme='brand' isLoading={userLoading}>Save</Button>
              <Button colorScheme='red' onClick={logoutUser} isLoading={userLoading}>Sign Out</Button>
            </Stack>}
        </form>
        <Stack>
          {
            sharedPlans.map((plan) => (
              <Box key={plan?.id} maxW={1000}>
                <Flex>
                  <Text as='b' fontSize={'2xl'}>{plan?.name}</Text>
                  <Spacer />
                  <Text>Shared on: {moment(plan?.inserted_at).format(dateFormatMonthDayTime)}</Text>
                </Flex>
                <Text fontSize={'xs'}>{plan?.description}</Text>
                <PlanTable pageTask={plan} taskTree={pageProfile?.shared_tasks} isEditable={false} />
              </Box>
            ))
          }
        </Stack>
      </Box>
    </PageLoading>
  );
}

export default ProfilePage