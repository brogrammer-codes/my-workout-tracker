import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchProfiles, fetchUser, login, patchUserProfile, signup } from '@/utils/api';
import { useToast } from '@chakra-ui/react';

export const useUser = () => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const router = useRouter();
  const toast = useToast()
  const getUser = async () => {
    await fetchUser()
      .then((user) => {
        setUser(user)
        setloading(false)
      })
      .catch((e) => {
        setError(e)
        window.localStorage.removeItem('token')
      }
      );
  };

  const getProfiles = async () => {
    setloading(true)
    await fetchProfiles()
    .then(({profiles}) => {
      setProfiles([...profiles])
      setloading(false)
    }).catch((e) => {
      setError(e)
    }

    );
  }

  const updateUserProfile = async (profile) => {
    setloading(true)
    delete profile.complete_tasks
    await patchUserProfile(profile)
      .then((profile) => {
        setUser({ ...user, profile })
        setloading(false)
        toast({
          title: 'Account updated.',
          description: "Your account has been updated",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((e) => {
        setError(e)
      }

      );
  };
  const loginUser = async (email, password) => {
    await login(email, password)
      .then((response) => response)
      .catch((e) => {
        setError("Invalid email or password")
      }
      );
  };
  const logoutUser = async () => {
    setUser(null)
    window.localStorage.removeItem('token')
    router.push('/login')
  }
  return { error, loading, getUser, user, updateUserProfile, loginUser, logoutUser, getProfiles, profiles }

}