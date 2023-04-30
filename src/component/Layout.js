import { Flex, Box, Container } from '@chakra-ui/react'
import Header from './Header'
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <Box height={'100vh'}>
      <Head>
        <title>My Workout Tracker</title>
        <meta name="description" content="I created this to help me organize my thoughts and tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex alignItems="start" justifyContent="center" background="brand.200" height="100%" overflow="scroll">
        <Flex direction="column" padding="10" bg={'brand.200'} minW={'50%'}>
          <Header />
          <Box height={'100%'} width={'100%'}>
            {children}
          </Box>
        </Flex>
      </Flex>
      <div className="landing-page__footer">
        <p>&copy; 2023 Brogrammer Codes</p>
      </div>
    </Box>
  )
}

export default Layout