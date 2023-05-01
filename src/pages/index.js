import { AspectRatio , Container, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

const Home = () => {
  return (
    <Container  color={'brand.50'}>
      <Heading as="h1" size="lg">Welcome to my workout tracker!</Heading>
        <Text fontSize='2xl'>
          I created this to help me organize my workouts, tasks, goals, and general thoughts.
          It is pretty buggy rn but basically usable.
          Currently you can create tasks, sub-tasks, sub-sub-tasks, etc. It should appear as a list, with the root node/task being the top and each sub-task rendered under it.
          The plan is to add more features.
        <br />
          <Link href='/login' color='blue.400' _hover={{ color: 'blue.500' }}> Login/Signup </Link> into your account and go to the
          <Link href='/task' color='blue.400' _hover={{ color: 'blue.500' }}> task </Link>
          page to start creating tasks.
        </Text>
          <Text fontSize={'lg'}>Check out my youtube channel for some details on how to use this application as well as a look at how it is being developed. </Text>
          <AspectRatio maxW='560px' ratio={4/3}>
          <iframe src="https://www.youtube.com/embed/videoseries?list=PLb0gleyz8hLXZfKciuHsJyPrAnLddXBwh" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </AspectRatio >


    </Container>
  )
}
export default Home
