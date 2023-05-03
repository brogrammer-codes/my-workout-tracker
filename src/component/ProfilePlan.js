import React, { useState } from 'react'
import { Box, Text, Flex, Spacer, Icon, Fade } from '@chakra-ui/react';
import { ActivityTable } from '@/component/TaskTable';
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
export const ProfilePlan = ({ plan, taskTree }) => {
  const [showTable, setShowTable] = useState(false)
  return (
    <Box key={plan?.id} maxW={800}>
      <Flex onClick={() => setShowTable((currentShow) => !currentShow)} cursor={'pointer'} alignItems={'center'}>
        {showTable ? <Icon as={AiFillCaretUp}/> : <Icon as={AiFillCaretDown}/>}
        <Text as='b' fontSize={'2xl'}>{plan?.name}</Text>
        <Spacer />
        <Text>Shared on: {moment(plan?.inserted_at).format(dateFormatMonthDayTime)}</Text>
      </Flex>
      {showTable && (
        <Fade in={showTable}>
          <Text fontSize={'xs'}>{plan?.description}</Text>

          <ActivityTable pageTask={plan} taskTree={taskTree} isEditable={false} />
        </Fade>

      )}
    </Box>
  )
}
