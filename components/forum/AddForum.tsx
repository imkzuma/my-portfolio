import { Flex, Box, Stack, Text, Heading, useColorModeValue, Divider, Icon, Button, Spacer, Fade, useToast } from "@chakra-ui/react";
import InputTextArea from "../forms/InputTextarea";
import { useState, useEffect } from "react";
import parse from 'html-react-parser';
import InputText from "../forms/InputText";
import CardAddForum from "./card/AddForum";
import { ArrowBackIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { OfficialApi } from "@/utils/api";

const PreviewForum = ({ title, content }: { title: string, content: string }) => {
  return (
    <CardAddForum>
      <Stack spacing={5}>
        <Stack spacing={3} textAlign={'center'}>
          <Text fontSize={'md'} fontWeight={'500'}>
            Preview Forum
          </Text>
          <Divider />
        </Stack>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          {title}
        </Text>
        <div className="parse-body">
          {parse(content)}
        </div>
      </Stack>
    </CardAddForum>
  )
}

export default function AddForumComponents({ slug, username }: { slug: string, username: string }) {
  const router = useRouter();
  const Toast = useToast();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPreview, setPreview] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handlePostThreads = async (e: any) => {
    e.preventDefault();

    if (!isLogin) {
      return Toast({
        position: "top",
        title: "Login Terlebih Dahulu",
        description: "Tidak bisa membuat thread, anda harus login terlebih dahulu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      setLoading(true);
      const response = await OfficialApi.post('/thread/create', {
        title: title,
        content: content,
        slug: slug
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Threads Success',
          text: 'Threads Success Dibuat',
          confirmButtonText: "OK"
        }).then(() => {
          router.replace({
            pathname: "/blog/post/[username]/thread",
            query: { username: username, slug: slug }
          });
        });
      }
    } catch (error) {
      Toast.closeAll();
      return Toast({
        position: "top",
        title: "Threads Failed",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(true);
    }
  }

  return (
    <Stack spacing={5} w={'full'}>
      <CardAddForum>
        <Stack spacing={10}>
          <InputText title="Buat Judul Forum" text={title} setText={setTitle} />
          <Stack>
            <Text fontSize={'md'} fontWeight={'500'}>
              Buat Konten Forum
            </Text>
            <InputTextArea text={content} setText={setContent} />
          </Stack>
        </Stack>
      </CardAddForum>

      <Fade in={isPreview}>
        <Box display={isPreview ? 'block' : 'none'}>
          <PreviewForum title={title} content={content} />
        </Box>
      </Fade>

      <Flex justify={'end'} w={{ base: 'full' }} gap={3}>
        <Button onClick={() => setPreview(!isPreview)}>
          Preview Forum
        </Button>
        <Button
          bg={useColorModeValue('blue.500', 'blue.700')}
          color={'white'}
          _hover={{
            bg: useColorModeValue('blue.600', 'blue.800')
          }}
          onClick={handlePostThreads}
          isDisabled={title === '' || content === ''}
          isLoading={loading}
        >
          Post Forum
        </Button>
      </Flex>
    </Stack>
  )
}