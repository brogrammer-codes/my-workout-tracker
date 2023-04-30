import React, { useEffect } from 'react'
import { useTaskListContext } from '@/context/context';
import { Box, Card, CardBody, CardFooter, Divider, Heading, Stack,  Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons'
import {FaDumbbell, FaGlobeEurope} from 'react-icons/fa'
const Profiles = () => {
  const { getProfiles, profiles, userLoading } = useTaskListContext()
  useEffect(() => {
    getProfiles()
  }, [])

  return (
    <Box color={'brand.50'}>
      <Heading>Profiles</Heading>
      <Text>Only users with a username will appear here</Text>
      {
        profiles.length ? (
          <Stack padding={2}>
            {
              profiles.map((profile) => (
                <Card bg={'brandCard.400'} size={'md'} color={'brand.50'} _hover={{ bg: 'brand.500' }} key={profile?.id}>
                  <CardBody>

                    <Heading>{profile?.username}</Heading>
                    <Text as={'i'}>{profile?.full_name}</Text>
                    <CardFooter>
                      <Stack  padding={2}>
                      {profile?.website &&
                        <Text><Icon as={FaGlobeEurope} /> {profile?.website}</Text>
                      }
                      {profile?.favorite_activity &&
                        <Text><Icon as={FaDumbbell} /> {profile?.favorite_activity}</Text>
                      }

                      </Stack>
                    </CardFooter>
                  </CardBody>
                </Card>
              ))
            }
          </Stack>
        ) : null
      }
    </Box>
  )
}

export default Profiles