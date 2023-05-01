import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useTaskListContext } from '@/context/context';
import { useToast } from '@chakra-ui/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null)
  // const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast()

  const { loginUser, setToken, user, error } = useTaskListContext()
  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(email).then(() => setUserId(true))
  };

  useEffect(() => {
  }, [user])

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = urlParams.get("access_token");
    const error_description = urlParams.get("error_description");
    if(error_description){
      router.push(`/login`)
      toast({
        title: 'Something went wrong',
        description: error_description,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (token && !accessToken) {
      setToken(token)
    } else if (accessToken) {
      localStorage.setItem('token', accessToken);
      setToken(accessToken)
      toast({
        title: 'Setting Token...',
        description: "If your token is successfully varified, you will be re-directed to the user page shortly",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
    if (user?.user?.id) {
      router.push(`profiles/${user.user.id}`)
    }
  }, [user]);
  return (
    <Box w="100%" maxW="400px" m="auto" mt="10" color={'brand.50'}>
      <Heading mb="6" textAlign="center">
        Log in
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="3">
          <FormControl isRequired isInvalid={!!error}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isDisabled={userId}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" isDisabled={userId}>
            Log in/Sign-Up with Email
          </Button>
{/* 
          <Button variant="link" onClick={handleSignUp}>
            Don&apos;t have an account? Sign up
          </Button>
        */}
        {
          userId && (<>Check your Email!</>)
        } 
        </Stack>
      </form>
    </Box>
  );
}
