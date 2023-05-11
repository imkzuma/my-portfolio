import {
    Box, Flex, Button, Stack,
    Text, IconButton, HStack, ScaleFade,
    useDisclosure,useColorModeValue, useColorMode, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader, DrawerCloseButton,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Logo } from '@/components/logo/';
import NavLink from './NavLink';

interface LinkData {
    id: number;
    name: string;
    href: string;
    active?: boolean;
};

const Links = [
    { id: 1, name: 'Home', href: '#', active: true},
    { id: 2, name: 'About', href: '#', active: false},
    { id: 3, name: 'Blog', href: '#', active: false},
    { id: 4, name: 'Portfolio', href: '#', active: false},
] as LinkData[];

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box 
            pos={'sticky'} top = {0} zIndex={999}
            bg={useColorModeValue('white', 'gray.900')} 
            borderBottom = {`1px solid ${useColorModeValue('#eaeaea' , 'none')}`} 
            px={{ base: 5, lg: '10rem' }}
        >
            <Flex h={'4.5rem'} alignItems={'center'} justifyContent={'space-between'}>
                <HStack>
                    <IconButton
                        size = {'md'}
                        icon={ isOpen? <CloseIcon/> : <HamburgerIcon />}
                        aria-label='Open Menu'
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <Box>
                        <Flex alignItems={'center'} gap = {2} fontWeight={'semibold'} color = {'blue.400'}>
                            <Logo py = {2} /> 
                            Portfolio.
                        </Flex>
                    </Box>
                </HStack>

                <Flex alignItems={'center'} gap = {12} >
                    <Stack direction={'row'} spacing={4} as={'nav'} display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => {
                            return(
                                <NavLink key={link.id} href={link.href} isActive = {link.active}>
                                    <Text fontSize={'14px'}>
                                        {link.name}
                                    </Text> 
                                </NavLink>
                            )
                        })}
                    </Stack>
                    <Button 
                        bg = {useColorModeValue('blue.400', 'blue.600')}
                        color = {useColorModeValue('white', 'gray.200')}
                        _hover = {{
                            bg: useColorModeValue('blue.500', 'blue.700'),
                        }}
                        onClick={toggleColorMode}
                    >
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Flex>
            </Flex>
            {isOpen && 
                <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth='1px'>
                            <Box>
                                <Text color={'blue.400'}>
                                    <Flex alignItems={'center'} gap = {2} fontWeight={'semibold'}>
                                        <Logo py = {2} /> 
                                        Portfolio.
                                    </Flex>
                                </Text>
                            </Box>
                        </DrawerHeader>
                        <DrawerBody>
                            {Links.map((link) => {
                                return(
                                    <Flex key={link.id} gap = {5}>
                                        <NavLink href={link.href}>        
                                            {link.name}
                                        </NavLink>
                                    </Flex>
                                )
                            })}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            }
        </Box>
    );
}