import { Flex, useColorModeValue, useColorMode, Button, Menu, MenuButton, MenuList, MenuGroup, MenuDivider, MenuItem, Avatar, IconButton, Stack, HStack, Switch, Text, Box, useDisclosure, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, CloseButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Logo } from "../logo";


const LinkParent = ({ path, name }: { path: string, name: string }) => {
  const router = useRouter();
  const activeColor = useColorModeValue('blue.500', 'blue.500');
  const inactiveColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Text as="a"
      href={path}
      w={'fit-content'}
      color={
        router.pathname === path
          ? activeColor
          : inactiveColor
      }
    >
      {name}
    </Text>
  )
}

const MobileNav = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size={'full'}>
      <DrawerContent display={{ md: 'none' }}>
        <DrawerHeader borderBottomWidth='1px'>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'blue.400'}>
              <Flex alignItems={'center'} gap={2} fontWeight={'semibold'}>
                <Logo py={2} />
                Portfolio.
              </Flex>
            </Text>
            <Button onClick={onClose} variant={'unstyled'}>
              <CloseButton />
            </Button>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing={5} py={8}>
            <Text fontWeight={'semibold'} color={useColorModeValue('gray.600', 'gray.400')}>Dashboard</Text>
            <Stack spacing={3}>
              <LinkParent path="/dashboard" name="Home" />
            </Stack>
            <Divider w={'70%'} />
            <Text fontWeight={'semibold'} color={useColorModeValue('gray.600', 'gray.400')}>Blog</Text>
            <Stack spacing={3}>
              <LinkParent path="/dashboard/blog" name="Blog List" />
              <LinkParent path="/dashboard/blog/create" name="Create Blog" />
            </Stack>
            <Divider w={'70%'} />
            <Text fontWeight={'semibold'} color={useColorModeValue('gray.600', 'gray.400')}>Profile</Text>
            <Stack spacing={3}>
              <LinkParent path="/dashboard/profile" name="My Profile" />
            </Stack>
          </Stack >
        </DrawerBody>
      </DrawerContent>
    </Drawer >
  )
}

export default function Navbar() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex as="nav"
      pos={'sticky'} top={0} zIndex={1}
      w={'full'}
      h={14}
      py={10}
      bg={useColorModeValue('white', 'gray.800')}
      px={{
        base: 0,
        md: 5,
        lg: 10,
      }}
      align={'center'}
      justify={'space-between'}
    >
      <MobileNav isOpen={isOpen} onClose={onClose} />
      <HStack spacing={5}>
        <IconButton
          icon={isOpen ? <CloseIcon fontSize={'xl'} /> : <HamburgerIcon fontSize={'xl'} />}
          aria-label='Open Menu'
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant={'unstyled'}
        />
        <Box>
          <Flex alignItems={'center'} gap={2} fontWeight={'semibold'} color={'blue.400'}>
            <Logo py={2} />
            Portfolio.
          </Flex>
        </Box>
      </HStack>

      <HStack
        pe={{ base: 5, lg: 10 }}
        spacing={{ base: 3, md: 7 }}
      >
        <Text as="a" href="/">
          Home
        </Text>
        <HStack
          border={'1px'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          bg={useColorModeValue('gray.100', 'gray.900')}
          p={2}
          rounded={'full'}
        >
          <MoonIcon />
          <Switch
            id="color-change"
            onChange={toggleColorMode}
            isChecked={colorMode === 'light'}
          />
          <SunIcon />
        </HStack>
        <Menu isLazy>
          <MenuButton>
            <Avatar
              size={{ base: 'sm', md: 'sm' }}
            />
          </MenuButton>
          <MenuList p={3} >
            <MenuGroup title="Profile">
              <MenuItem py={3}> Accounts </MenuItem>
              <MenuItem py={3}> Settings </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem
              as={Button}
              bg={'red'}
              color={'white'}
              _hover={{
                bg: 'red'
              }}
              onClick={() => router.replace('/auth/logout')}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}