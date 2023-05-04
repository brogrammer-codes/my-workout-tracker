import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    IconButton,
    Portal,
    Button
} from '@chakra-ui/react'
import { Icon, DeleteIcon } from "@chakra-ui/icons";

export const DeleteTaskIcon = ({ onDelete, taskName }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton colorScheme='red' aria-label='open-task-icon' size="sm" icon={<DeleteIcon boxSize={4} />} />
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Are you sure you want to delete {taskName}?</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Button colorScheme='red' onClick={onDelete}>Delete</Button>
                    </PopoverBody>
                    <PopoverFooter>This cannot be reversed. </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}
