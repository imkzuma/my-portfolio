import { OfficialApi } from "@/utils/api";
import { Avatar, Button, Fade, Flex, Input, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function WriteReplyComponent({ id, username, ...rest }: any) {
  const toast = useToast();

  const [comment, setComment] = useState<string>('');
  const [showButton, setShowButton] = useState<boolean>(false);
  const [commentUsername, setCommentUsername] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      const userLoginName = localStorage.getItem('auth-username');
      setCommentUsername(userLoginName as string);
      setIsLogin(true);
    }
    else {
      setCommentUsername('');
      setIsLogin(false);
    }
  }, []);

  const handlePostReply = async (e: any) => {
    e.preventDefault();

    try {
      if (!isLogin) {
        return toast({
          position: "top",
          title: "Login Terlebih Dahulu",
          description: "Tidak Bisa Komen. Silahkan login terlebih dahulu",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      const response = await OfficialApi.post('/thread/comment', {
        content: comment,
        parent: id
      });
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      const { response } = error as any;
      if (response.status === 401) {
        return toast({
          position: "top",
          title: "Login Terlebih Dahulu",
          description: "Tidak Bisa Komen. Silahkan login terlebih dahulu",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  const handleCancelComment = () => {
    setComment('');
    setShowButton(false);
  }

  return (
    <Stack
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      h={'fit-content'}
      p={{ base: 5, lg: 10 }}
      transition={'all ease .3s'}
      rounded={'xl'}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      {...rest}
    >
      <Flex
        gap={5}
        align={'center'}
      >
        <Avatar
          name={commentUsername ? commentUsername : ''}
        />
        <Input
          border={'none'}
          borderBottom={'1px'}
          borderColor={useColorModeValue('gray.400', 'gray.600')}
          rounded={'none'}
          type={'text'}
          placeholder="Write a comment"
          _focus={{
            outline: 'none',
            boxShadow: "none"
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setShowButton(true)}
        />
      </Flex>
      <Fade in={showButton}>
        <Flex justify={'end'} display={showButton ? 'flex' : 'none'} gap={4}>
          <Button
            onClick={handleCancelComment}
            size={{ base: 'sm', md: 'md' }}
          >
            Batal
          </Button>
          <Button
            bg={useColorModeValue('blue.500', 'blue.600')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('blue.600', 'blue.700')
            }}
            onClick={handlePostReply}
            size={{ base: 'sm', md: "md" }}
          >
            Kirim Komentar
          </Button>
        </Flex>
      </Fade>
    </Stack >
  )
}