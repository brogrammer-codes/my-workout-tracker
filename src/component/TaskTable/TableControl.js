import { HStack, Popover, PopoverTrigger, PopoverContent, Box, PopoverArrow } from '@chakra-ui/react'
import React from 'react'

export const TableControl = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box cursor={'pointer'}>Click Me!</Box>
      </PopoverTrigger>
      <PopoverArrow />
      <PopoverContent color='white' bg='blue.800' borderColor='blue.800' padding={'1'}>
        <HStack>

          {children}
        </HStack>
      </PopoverContent>
    </Popover>
  )
}

