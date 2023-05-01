import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Box, Spinner } from '@chakra-ui/react';
import { TaskTree } from '@/component/TaskTree';
import { useTaskListContext } from '@/context/context';

const ProfilePage = () => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [pageProfile, setPageProfile] = useState(null)
  const { getProfiles, profiles, user } = useTaskListContext()
  const { id } = router.query;
  useEffect(() => {
    console.log(user);
    if(user && user?.user?.id === id) {
      setIsEditable(true)
      setPageProfile({...user?.profile})
    }
    else if(profiles.length) {
      const currentProfile = profiles.find((profile) => profile?.id === id)
      setPageProfile({...currentProfile})
    } else {
      getProfiles()
    }
  }, [id, profiles, user])
  if(!pageProfile) return <Spinner />
  console.log(pageProfile);
  return (
    <Box>
      {pageProfile?.id}
      <TaskTree elements={pageProfile?.shared_tasks}/>
    </Box>
  )
}

export default ProfilePage