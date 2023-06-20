import { Button, Divider, Flex, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import BoxContainer from "@/components/container";
import { Logo } from "@/components/logo/";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { ReactNode } from "react";

const FooterLink = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      color={useColorModeValue('gray.600', 'gray.500')}
      fontWeight={'semibold'}
      cursor={'pointer'}
      fontSize={{ base: 'md', lg: "lg" }}
      _hover={{
        textDecoration: 'none',
        color: useColorModeValue('blue.400', 'blue.600'),
        transition: 'all 0.3s ease'
      }}
      transition={'all 0.3s ease'}
    >
      {children}
    </Text>
  )
}

export default function ContentFooter() {
  return (
    <BoxContainer>
      <Stack justify={'center'} align={'center'} spacing={8} pt={14}>
        <Flex alignItems={'center'} gap={2} fontWeight={'semibold'} color={'blue.400'}>
          <Logo py={2} />
          Portfolio.
        </Flex>

        <Flex gap={7} flexWrap={'wrap'} justify={'center'} align={'center'}>
          <FooterLink>Home</FooterLink>
          <FooterLink>About</FooterLink>
          <FooterLink>Blog</FooterLink>
          <FooterLink>Projects</FooterLink>
          <FooterLink>Contact</FooterLink>
        </Flex>

        <Flex gap={7}>
          <Button variant={'outline'} >
            <Icon as={BsLinkedin} />
          </Button>
          <Button variant={'outline'} >
            <Icon as={BsGithub} />
          </Button>
          <Button variant={'outline'} >
            <Icon as={BsInstagram} />
          </Button>
        </Flex>

        <Stack w={'full'} align={'center'} py={5} spacing={6}>
          <Divider borderColor={'blue.300'} />
          <Text color={useColorModeValue('gray.500', 'gray.500')}>
            &copy; Copyright 2023. All right reserved.
          </Text>
        </Stack>
      </Stack>
    </BoxContainer>
  )
}