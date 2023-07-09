import { useRouter } from "next/router";
import { useState, useLayoutEffect } from "react";
import Head from "next/head";
import parse from 'html-react-parser';
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import FormData from "form-data";
import Swal from "sweetalert2";

import { DashboardLayout } from "@/layouts/DashboardLayout";

import InputTextArea from "@/components/forms/InputTextarea";
import { OfficialApi } from "@/utils/api";
import useAuth from "@/utils/hooks/useAuth";

export default function CreateBlog() {
  const router = useRouter();
  const isAuth = useAuth();

  useLayoutEffect(() => {
    if (!isAuth) {
      router.push('/auth/login');
    }
  }, [isAuth, router])

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);

  const handleImageUpload = (e: any) => {
    setFile(e.target.files[0]);
  }

  const handlePostBlog = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      let formData = new FormData();

      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', file);

      const response = await OfficialApi.post('/post/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { data } = response;

      if (data.code === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Blog has been created',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.replace('/dashboard/blog');
          }
        });
      }

    } catch (error) {
      const { response } = error as any;
      if (response.status === 401) {
        localStorage.removeItem('@portfolio/user');

        Swal.fire({
          title: 'Error',
          text: 'Your session has been expired',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.replace('/auth/login');
          }
        });
      }

    } finally {
      setLoading(false);
    }
  }

  const checkSpecialChar = (e: any) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const value = e.target.value;
    if (regex.test(value)) {
      e.target.value = value.replace(regex, '');
    }
  }

  return (
    <>
      <Head>
        <title>My Portfolio | Create Blog</title>
      </Head>
      <DashboardLayout>
        <Flex
          align={{ base: 'center', lg: 'start' }}
          justify={{ base: 'center', lg: 'start' }}
        >
          <Stack
            w={{ base: 'full', lg: '95%' }}
            py={{ base: 5, lg: 10 }}
            spacing={5}
          >
            <Flex
              justify={{ base: 'space-between', md: 'start' }}
              align={'center'}
              gap={4}
            >
              <ChevronLeftIcon
                fontSize={'3xl'}
                onClick={() => router.push('/dashboard/blog')}
                cursor={'pointer'}
                display={{ base: 'block', lg: 'none' }}
              />
              <Text
                fontWeight={'semibold'}
              >
                Create Blog
              </Text>
              <ChevronLeftIcon
                fontSize={'3xl'}
                bg={'transparent'}
                color={'transparent'}
              />
            </Flex>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              border={'1px'}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              rounded={'xl'}
              p={{ base: 5, md: 10 }}
            >
              <Stack spacing={5}>
                <Text>Content Blog</Text>
                <Divider />
                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>
                      Masukkan Judul
                    </FormLabel>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={checkSpecialChar} />
                  </FormControl>

                  <FormControl isRequired as={Stack}>
                    <FormLabel>
                      Masukkan Banner
                    </FormLabel>
                    <Input type="file" onChange={handleImageUpload} />
                  </FormControl>

                  <FormControl
                    isRequired
                    as={Stack}
                  >
                    <FormLabel>
                      Masukkan Content
                    </FormLabel>
                    <InputTextArea text={content} setText={setContent} />
                  </FormControl>
                </Stack>

              </Stack>
            </Box>
            <Flex justify={'end'} align={'center'} gap={4}>
              <Button
                onClick={() => setPreview(!preview)}
                isDisabled={file && title && content ? false : true}
              >
                Preview Blog
              </Button>
              <Button
                bg={useColorModeValue('blue.400', 'blue.600')}
                _hover={{
                  bg: useColorModeValue('blue.500', 'blue.700')
                }}
                onClick={handlePostBlog}
                isLoading={loading}
              >
                Post Blog
              </Button>
            </Flex>

            <Box
              bg={useColorModeValue('white', 'gray.800')}
              border={'1px'}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              rounded={'xl'}
              p={{ base: 5, md: 10 }}
              display={
                file && title && content && preview
                  ? 'block' : 'none'
              }
            >
              <Stack spacing={3}>
                <Text>Preview Blog</Text>
                <Divider />

                <Stack spacing={5}>
                  <Heading> {title} </Heading>
                  <Box
                    w={'full'}
                    bg={useColorModeValue('gray.200', 'gray.700')}
                    h={'450px'} maxH={'450px'}
                    overflow={'hidden'}
                    rounded={'xl'}
                  >
                    <Image
                      src={file ? URL.createObjectURL(file) : ''}
                      h={'450px'} maxH={'450px'}
                      objectFit={'cover'} boxSize={'full'} objectPosition={'center'}
                      alt={title ? title : 'Image Preview'}
                    />
                  </Box>
                  <div className="parse-body">
                    {parse(content)}
                  </div>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </DashboardLayout>
    </>
  )
}