import { Box, Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const PageLoading = ({isLoading, children}) => {
  return (
    <Box justifyContent={'center'} p="4" color={'brand.50'}>
        {
            isLoading ? (<Center height={400}><Spinner /></Center>) : children
        }
    </Box>
  )
}



export default PageLoading