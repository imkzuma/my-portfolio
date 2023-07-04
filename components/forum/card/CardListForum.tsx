import { Avatar, Box, Button, Divider, Fade, Flex, HStack, Heading, Icon, Input, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react"
import parse from 'html-react-parser';
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import WriteReplyComponent from "./WriteReply";
import ViewComment from "./ViewComment";
import { OfficialApi } from "@/utils/api";

interface CardListForumProps {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  thread_owner: string;
  post_ownder: string;
}

export default function CardListForum({ data, slug, username }: any) {
  const router = useRouter();
  const [addComment, setAddComment] = useState<boolean>(false);
  const [viewComment, setViewComment] = useState<boolean>(false);
  const [dataComment, setDataComment] = useState<any>();

  const { id, title, createdAt, content, thread_owner, post_ownder } = data as CardListForumProps;

  const handleViewComment = async () => {
    setViewComment(!viewComment);
    try {
      const response = await OfficialApi.get(`/thread/comment/${id}`)

      if (response.status === 200) {
        setDataComment(response.data.data.replies);
      }
    } catch (error) {
      setDataComment(null);
      console.log(error);
    }
  }

  const handleAddComment = () => {
    setAddComment(!addComment);
  }

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        rounded={{ base: 'lg', md: 'xl' }}
        p={{ base: 5, md: 8 }}
        py={{ base: 8, md: 8 }}
        border={'1px'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        as={motion.div}

      >
        <Stack spacing={5}>
          <Stack spacing={3}>
            <Heading color={useColorModeValue('gray.700', 'white')}>
              {title}
            </Heading>
            <Divider />
          </Stack>
          <Flex align={'center'} justify={'space-between'}>
            <HStack spacing={4}>
              <Avatar
                name={thread_owner}
                rounded={'lg'}
              />
              <Stack spacing={0}>
                <Text fontWeight={'semibold'}>{thread_owner}</Text>
                <Text
                  color={useColorModeValue('gray.400', 'gray.500')}
                >
                  {createdAt}
                </Text>
              </Stack>
            </HStack>
          </Flex>
          <Box
            color={useColorModeValue('gray.500', 'gray.400')}
            lineHeight={1.8}
          >
            {parse(content ? content : '')}
          </Box>
          <Flex align={'center'} justify={'space-between'}>
            <Button
              variant={'ghost'}
              color={'blue.500'}
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
            <Button
              variant={'ghost'}
              color={'blue.500'}
              onClick={handleViewComment}
            >
              View Comment
            </Button>
          </Flex>
        </Stack>
      </Box>

      <Fade in={addComment}>
        <WriteReplyComponent
          display={addComment ? 'block' : 'none'}
          id={id}
          username={username}
        />
      </Fade>

      <Fade in={viewComment}>
        <Box
          ps={{ base: 0, md: 10 }}
        >
          <ViewComment
            data={dataComment}
            usernameComment={username}
            display={viewComment ? 'block' : 'none'}
          />
        </Box>
      </Fade>
    </>
  )
}