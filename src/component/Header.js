import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Spacer, useDisclosure, Link, UnorderedList, IconButton, ListItem, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useTaskListContext } from '@/context/context';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, userLoading } = useTaskListContext()
  const [username, setUsername] = useState(null)
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    if (!userLoading) {
      if (user?.user?.id) {
        setMenuItems([
          { name: "Home", href: "/" },
          { name: "Profiles", href: "/profiles" },
          { name: "Folders", href: "/task" },
          { name: "User", href: `/profiles/${user?.user?.id}` },
        ])
        setUsername(user?.profile?.username)
      } else {
        setMenuItems([
          { name: "Home", href: "/" },
          { name: "Profiles", href: "/profiles" },
          { name: "Login", href: "/login" },
        ])
      }
    }
  }, [userLoading])

  return (
    <Flex alignItems="center" width={'full'} p={{ base: 5, md: 7 }} top={0} position='fixed' bg={'brand.900'} zIndex={20} color={'brand.50'} >
      <Heading as="h1" size="md">
        {username ? `Welcome, ${username}` : 'My Workout Tracker'}
      </Heading>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        <Heading as="h1" size="md">{username && 'My Workout Tracker'}</Heading>
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        <UnorderedList display={{ base: "none", md: "flex" }} >
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              display="block"
              href={item.href}
              as={Link}
              cursor={'pointer'}
              _hover={{ bg: 'brand.500', fontSize: 'xl' }}
              px={4}
              py={1}
            >
              <Text fontSize={'lg'}>{item.name}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box display={{ base: "block", md: "none" }} marginRight={2}>
        <IconButton icon={<HamburgerIcon />} onClick={onToggle} variant='unstyled' color='brand.50' size={'lg'} />
      </Box>
      <UnorderedList display={{ base: isOpen ? "block" : "none", md: "none" }} mt={{ base: 4, md: 0 }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            display="block"
            href={item.href}
            as={Link}
            cursor={'pointer'}
            _hover={{ bg: 'brand.500', fontSize: 'xl' }}
            px={4}
            py={1}
          >
            <Text fontSize={'lg'}>{item.name}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
};

export default Header;
