import { HStack, Popover, PopoverTrigger, PopoverContent, Box, PopoverArrow, useMediaQuery } from '@chakra-ui/react'
import { Icon } from "@chakra-ui/icons";

import {TbDots} from 'react-icons/tb'
import React from 'react'

export const TableControl = ({ children }) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 800px)")
  if (isLargeScreen) {
    return <HStack spacing={2}>{children}</HStack>;
  }
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Box cursor={'pointer'}>

        <Icon as={TbDots} boxSize={5}/>
        </Box>
      </PopoverTrigger>
      <PopoverArrow />
      <PopoverContent color='white' bg='brand.600' borderColor='brand.500' padding={2} width='full' borderWidth={2}>
        <HStack spacing={2}>
          {children}
        </HStack>
      </PopoverContent>
    </Popover>
  )
}