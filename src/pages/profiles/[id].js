import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, Text, Stack,} from '@chakra-ui/react';

import { useTaskListContext } from '@/context/context';
import { ActivityPicker } from '@/component/ActivityPicker';
import PageLoading from '@/component/PageLoading';
import { TASK_TYPES } from '@/utils/constants';

import { ProfilePlan } from '@/component/ProfilePlan';

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

  const updateProfile = (key, value) => setPageProfile({ ...pageProfile, [key]: value })
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProfile = {...pageProfile}
    delete updatedProfile.shared_tasks
    updateUserProfile(updatedProfile);
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
        <Stack paddingTop={3}>
          {
            sharedPlans.map((plan) => (
              <ProfilePlan key={plan?.id} plan={plan} taskTree={pageProfile?.shared_tasks} />
            ))
          }
        </Stack>
      </Box>
    </PageLoading>
  );
}

export default ProfilePage