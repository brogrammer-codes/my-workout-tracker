import { searchActivity } from '@/utils/constants/api/activity';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  Divider
} from '@chakra-ui/react';

export const ActivityPicker = ({ setActivity, activity, isDisabled }) => {
  const [currentActivities, setCurrentActivities] = useState([])
  const { onOpen, onClose: closePopover, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  useEffect(() => {
    searchActivity({ keyword: activity?.name }).then(({ task = [] }) => setCurrentActivities([...task]))

  }, [activity?.name])
  const onDropDownClicked = (element) => {
    setActivity({ ...element, id: null, parent_id: activity.parent_id, })
    closePopover()
  }
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={closePopover}
      placement='bottom'
      closeOnBlur={true}
      isLazy
      initialFocusRef={firstFieldRef}
    >
      <PopoverTrigger>

        <Input
          type="text"
          value={activity?.name}
          onChange={(event) => setActivity((prevAct) => ({ ...prevAct, name: event.target.value }))}
          ref={firstFieldRef}
          isDisabled={isDisabled}
          placeholder='Pick an activity'
        />
      </PopoverTrigger>
      {currentActivities.length > 0 &&
        <PopoverContent >
          <Stack>
            {currentActivities.map((element) =>
              <Box _hover={{ bg: 'brand.50' }} key={`${element?.id}-act`} color={'brand.500'} cursor={'pointer'} onClick={() => onDropDownClicked(element)}>
                {element.name}
                <Divider />
              </Box>
            )}
          </Stack>
        </PopoverContent>
      }
    </Popover>
  )
}