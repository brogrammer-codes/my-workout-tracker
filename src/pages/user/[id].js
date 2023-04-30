import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Input, Button, Text, Stack, Center, Spinner } from '@chakra-ui/react';
import { useTaskListContext } from '@/context/context';
import { ActivityPicker } from '@/component/TaskModal/ActivityPicker';
// import { getAccountDetails, updateAccountDetails } from '../api/accounts';

export default function Accounts() {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({username: '', website: '', full_name: '',});
  const {user, updateUserProfile, logoutUser, userLoading} = useTaskListContext()
  // Fetch account details on page load
  useEffect(() => {
    if(user && user?.profile) {
      const userProfile = user?.profile
      delete userProfile.id
      setProfile({...userProfile})
    }
  }, [router.query, user]);

  // Handle form submit to update account details
  const updateProfile = (key, value) => setProfile({...profile, [key]: value})
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateUserProfile(profile);
  }
  if (!user) return <Center h='100px'><Spinner /></Center >
  return (
    <Box justifyContent={'center'} p="4" color={'brand.50'}>
      <Heading mb="4">Account Details</Heading>
      <form onSubmit={handleSubmit}>
        <Box mb="4">
          <Input value={profile?.username} onChange={event => updateProfile('username', event.target.value)} placeholder="Username" />
        </Box>
        <Box mb="4">
          <Input value={profile?.full_name} onChange={event => updateProfile('full_name',event.target.value)} placeholder="Full Name" />
        </Box>
        <Box mb="4">
          <Input value={profile?.website} onChange={event => updateProfile('website',event.target.value)} placeholder="Website" />
        </Box>
        <ActivityPicker activity={{name: profile?.favorite_activity}} setActivity={(activity) =>  updateProfile('favorite_activity',activity?.name)}/>
        <Stack spacing={2}>

        <Button type="submit" colorScheme='brand' isLoading={userLoading}>Save</Button>
        <Button colorScheme='red' onClick={logoutUser}  isLoading={userLoading}>Sign Out</Button>
        </Stack>
      </form>
      <Text>Num complete tasks: {profile?.complete_tasks?.length}</Text>
    </Box>
  );
}
