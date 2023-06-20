import { ParsedDateTime } from "@/utils/parsingDateTime";
import { Box, Button, Flex, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { ReactNode } from 'react';
import { useRouter } from "next/router";

interface CardListBlogProps {
  image: string;
  slug: string;
  title: string;
  postDate: string;
  username: string;
  children?: ReactNode;
}

export default function CardListBlog({ image, slug, title, username, postDate, children }: CardListBlogProps) {
  const { isOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        w={'full'}
        justify={'start'}
        align={'start'}
        gap={{ base: 4, lg: 8 }}
        rounded={'xl'}
      >
        <Box
          w={{ base: 100, lg: 300 }} maxW={{ base: 100, lg: 300 }}
          h={{ base: 90, lg: 200 }} maxH={{ base: 90, lg: 200 }}
        >
          <Image
            src={image}
            w={{ base: 100, lg: 300 }} maxW={{ base: 100, lg: 300 }}
            h={{ base: 90, lg: 200 }} maxH={{ base: 90, lg: 200 }}
            objectFit={'cover'}
            alt={slug}
            rounded={"lg"}
          />
        </Box>
        <Stack>
          <Stack minH={{ lg: '125px' }}>
            <Text color={useColorModeValue('blue.500', 'blue.600')}>
              {username}
            </Text>
            <Text display={{ base: 'block', md: 'none' }} fontSize={{ base: 'lg', md: 'xl' }} fontWeight={'semibold'}>
              {title.length > 25 ? title.slice(0, 25) + "..." : title}
            </Text>
            <Text display={{ base: 'none', md: 'block' }} fontSize={{ base: 'lg', md: 'xl' }} fontWeight={'semibold'}>
              {title.length > 100 ? title.slice(0, 100) + "..." : title}
            </Text>
            <Flex
              align={"center"}
              gap={3}
            >
              <Icon as={BsClock} fontWeight={'semibold'} color={useColorModeValue('gray.500', 'gray.600')} />
              <Text color={useColorModeValue('gray.500', 'gray.600')} fontWeight={'semibold'}>
                Posted at {ParsedDateTime(postDate)}
              </Text>
            </Flex>
          </Stack>
          {children ? children : null}
        </Stack>
      </Flex>
    </>
  )
}