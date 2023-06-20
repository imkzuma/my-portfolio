import {
  Box, Flex, Button, Stack,
  Text, IconButton, HStack, ScaleFade,
  useDisclosure, useColorModeValue, useColorMode, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader, DrawerCloseButton, CloseButton,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Logo } from '@/components/logo/';
import NavLink from './NavLink';
import { useRouter } from 'next/router';

interface LinkData {
  id: number;
  name: string;
  href: string;
  isActive?: boolean;
};

const MobileNavbar = ({ isOpen, onClose, Links }: { isOpen: boolean, onClose: () => void, Links: LinkData[] }) => (
  <Drawer placement='left' onClose={onClose} isOpen={isOpen} size={'full'}>
    <DrawerOverlay display={{ md: 'none' }} />
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
        <Stack py={18}>
          {Links.map((link) => (
            <Flex key={link.id} gap={5}>
              <NavLink href={link.href} isActive={link.isActive}>
                {link.name}
              </NavLink>
            </Flex>
          ))}
        </Stack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
)

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const Links = [
    { id: 1, name: 'Home', href: '/', isActive: router.pathname === '/' },
    { id: 2, name: 'About', href: '#' },
    { id: 3, name: 'Blog', href: '/blog', isActive: ['/blog', '/blog/post/[username]/[slug]'].includes(router.pathname) },
    { id: 4, name: 'Portfolio', href: '#' },
  ] as LinkData[];

  return (
    <Box
      pos={'sticky'} top={0} zIndex={1}
      bg={useColorModeValue('white', 'gray.900')}
      borderBottom={`1px solid ${useColorModeValue('#eaeaea', 'none')}`}
      px={{ base: 5, lg: '10rem' }}
    >
      <MobileNavbar isOpen={isOpen} onClose={onClose} Links={Links} />

      <Flex h={'4.5rem'} alignItems={'center'} justifyContent={'space-between'}>
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

        <Flex alignItems={'center'} gap={12} >
          <Stack direction={'row'} spacing={4} as={'nav'} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.id} href={link.href} isActive={link.isActive}>
                <Text fontSize={'14px'}>
                  {link.name}
                </Text>
              </NavLink>
            ))}
          </Stack>
          <Button
            bg={useColorModeValue('blue.400', 'blue.600')}
            color={useColorModeValue('white', 'gray.200')}
            _hover={{
              bg: useColorModeValue('blue.500', 'blue.700'),
            }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}