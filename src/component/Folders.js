import { TASK_TYPES, getChildTreeLength, getPossibleSubtask, getSubTreeStats } from '@/utils/constants';
import { capitalizeString } from '@/utils/formats';
import { SimpleGrid, Box, Link, Text, Stack } from '@chakra-ui/react'
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';
import React from 'react'
import { Icon } from "@chakra-ui/icons";
import { HiFolderOpen, HiExternalLink } from 'react-icons/hi'
export const Folders = ({ folderTree }) => {
  const rootElements = folderTree.filter(el => el.parent_id === null);
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
      {
        rootElements.map((folder) => {
          const stats = getSubTreeStats(folder, folderTree)
          const subtask = getPossibleSubtask(folder)
          return (
            <>
              {
                stats?.upcoming_plan && (
                  <Box bg={'brand.100'} p={5} borderRadius={'lg'} as={Link} href={`/plan/workout/${stats?.upcoming_plan?.id}`} ><Text fontSize={'xl'} >Upcoming plan: {stats.upcoming_plan.name} <Icon as={HiExternalLink} /></Text></Box>
                )
              }
              <Box w={'full'} height={'100%'} key={folder.id} bg={'brand.800'} _hover={{ bg: 'brand.500', textDecoration: 'none' }} p={5} borderRadius={'lg'} as={Link} href={`/${folder?.type}/${folder?.id}`} >
                <Box
                  width={'100%'}
                  color={'brand.50'}
                >
                  <Text fontSize={'2xl'} >{capitalizeString(folder.name)} <Icon as={HiFolderOpen} /></Text>
                </Box>
                <Text>{folder?.description}</Text>
                <Box display={'flex'} flexDirection={'column'}>
                  <Text>

                    Last updated in {folder.name}: {stats?.latest_updated_task?.name} on {moment(stats?.latest_updated_task?.inserted_at).format(dateFormatMonthDayTime)}
                  </Text>
                  {
                    stats?.child_elements.length ? <Text> {capitalizeString(subtask)} count: {stats.child_elements.length} in {folder.name}</Text> : <Text>You have no {folder.name}, open the folder to create some.</Text>
                  }
                  {stats?.number_complete && (<Text>
                    Total Complete Tasks: {stats?.number_complete}
                  </Text>)}
                </Box>
              </Box>
            </>
          )
        })
      }
    </SimpleGrid>
  )
}