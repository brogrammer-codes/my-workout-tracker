import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, Text, Stack, Center, Spinner, Grid, GridItem } from '@chakra-ui/react';
import { TaskTree } from '@/component/TaskTree';
import { useTaskListContext } from '@/context/context';
import { ActivityPicker } from '@/component/TaskModal/ActivityPicker';
import PageLoading from '@/component/PageLoading';

const ProfilePage = () => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [pageProfile, setPageProfile] = useState(null)
  const { getProfiles, profiles, user, userLoading, logoutUser, updateUserProfile } = useTaskListContext()
  const { id } = router.query;
  useEffect(() => {
    console.log(user);
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
            <Input isDisabled={!isEditable} value={pageProfile?.username} onChange={event => updateProfile('username', event.target.value)} placeholder="Username" />
          </Box>
          {isEditable &&
            <Box mb="4">
              <Input value={pageProfile?.full_name} onChange={event => updateProfile('full_name', event.target.value)} placeholder="Full Name" />
            </Box>
          }
          <Box mb="4">
            <Input isDisabled={(!isEditable||!pageProfile)} value={pageProfile?.website} onChange={event => updateProfile('website', event.target.value)} placeholder="Website" />
          </Box>
          <ActivityPicker isDisabled={!isEditable} activity={{ name: pageProfile?.favorite_activity }} setActivity={(activity) => updateProfile('favorite_activity', activity?.name)} />
          {isEditable &&
            <Stack spacing={2}>

              <Button type="submit" colorScheme='brand' isLoading={userLoading}>Save</Button>
              <Button colorScheme='red' onClick={logoutUser} isLoading={userLoading}>Sign Out</Button>
            </Stack>}
        </form>
        {/* <Text>Num complete tasks: {profile?.complete_tasks?.length}</Text> */}
        <Grid>
          <GridItem>
            <TaskTree elements={pageProfile?.shared_tasks} />
          </GridItem>
        </Grid>
      </Box>
    </PageLoading>
  );
}

export default ProfilePage