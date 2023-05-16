import { HStack, Popover, PopoverTrigger, PopoverContent, Box, PopoverArrow } from '@chakra-ui/react'
import { Icon } from "@chakra-ui/icons";

import {TbDots} from 'react-icons/tb'
import React from 'react'

export const TableControl = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Icon as={TbDots}/>
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

