import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Spacer, useDisclosure, Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useTaskListContext } from '@/context/context';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useTaskListContext()
  const [username, setUsername] = useState(null)
  const [menuItems, setMenuItems] = useState([
    { name: "Home", href: "/" },
  ]);
  useEffect(() => {
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
  }, [user])

  return (
    <Flex alignItems="center" bg="gray.800"  color={'brand.50'} px={4} py={2}>
      <Heading as="h1" size="md">
        {username ? `Welcome, ${username}` : 'My Workout Tracker'}
      </Heading>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            mr={4}
            href={item.href}
            as={Link}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Button variant="ghost" color='brand.50' onClick={onToggle}>
          <HamburgerIcon />
        </Button>
      </Box>
      <Box display={{ base: isOpen ? "block" : "none", md: "none" }} mt={{ base: 4, md: 0 }}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            display="block"
            href={item.href}
            as={Link}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Flex>
  );
};

export default Header;
