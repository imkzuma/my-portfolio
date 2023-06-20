import CardListBlog from "@/components/blog/card/CardList";
import { DeleteBlogBySlug } from "@/components/blog/modal/DeleteModal";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { OfficialApi } from "@/utils/api";
import useAuth from "@/utils/hooks/useAuth";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect, useRef, useState } from "react";

export default function ListBlogDashboard() {
  const router = useRouter();
  const isAuth = useAuth();

  const [data, setData] = useState<string[]>();
  const [countPage, setCountPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [username, setUsername] = useState<string>();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>();

  const cancelRef = useRef();

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage >= 1 && countPage && currentPage < countPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  useLayoutEffect(() => {
    if (!isAuth) {
      router.push('/auth/login');
    }

    const authUsername = localStorage.getItem('auth-username');
    if (authUsername) {
      setUsername(authUsername);
    }
    const getData = async () => {
      try {
        const response = await OfficialApi.get(`/post/${username}?page=${currentPage}`);
        const { data } = response;
        setData(data.data.posts);
        setCountPage(data.data.pagination.page_count);

      } catch (error) {
        // console.log(error);
      }
    }
    getData();

  }, [currentPage, username, isAuth, router])

  const onCloseDeleteBtn = () => {
    setShowDelete(false);
  }
  const handleDeleteBtn = (slug: string) => {
    setShowDelete(true);
    setSlug(slug);
  }

  return (
    <>
      <Head>
        <title>Dashboard | Blog List</title>
      </Head>
      {showDelete && (
        <DeleteBlogBySlug
          isOpen={showDelete}
          cancelRef={cancelRef}
          onClose={onCloseDeleteBtn}
          slug={slug as string}
        />
      )}
      <DashboardLayout>
        <Stack spacing={7} bg={useColorModeValue('white', 'gray.800')} p={8} rounded={'xl'}>
          <Text fontSize={'xl'} fontWeight={'semibold'}>
            List Blogs
          </Text>
          {data && data.length > 0
            ? (data?.map((item: any, index: number) => {
              return (
                <Stack key={index} spacing={6} >
                  <Divider />
                  <CardListBlog
                    image={item.image}
                    postDate={item.createdAt}
                    slug={item.slug}
                    username={username as string}
                    title={item.title}
                  >
                    <Text>{item.slug}</Text>
                    <Flex gap={3}>
                      <Button as="a"
                        size={{ base: 'sm', md: 'md' }}
                        href={`/blog/post/${username}/${item.slug}`}
                      >
                        View
                      </Button>
                      <Button as="a"
                        size={{ base: 'sm', md: 'md' }}
                        href={`/dashboard/blog/edit/${username}/${item.slug}`}
                        colorScheme="blue"
                      >
                        Edit
                      </Button>
                      <Button
                        size={{ base: 'sm', md: 'md' }}
                        onClick={() => handleDeleteBtn(item.slug)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </CardListBlog>
                </Stack>
              )
            }))
            : (
              <Flex minH={'50vh'} justify={'center'} align={'center'}>
                <Text fontSize={'lg'} color={'gray.500'} textAlign={'center'}>
                  No Data
                </Text>
              </Flex>
            )
          }

          <Flex justify={'space-between'} align={'center'} borderTop={'1px'} borderColor={useColorModeValue('gray.300', 'gray.700')}>
            <Text pt={3}>
              Page {currentPage} of {countPage}
            </Text>
            <Flex justify={'end'} align={'center'} pt={3} gap={4}>
              <Button
                colorScheme="blue"
                onClick={handlePrevPage}
                isDisabled={currentPage === 1}
              >
                <ChevronLeftIcon fontSize={'xl'} />
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleNextPage}
                isDisabled={currentPage === countPage}
              >
                <ChevronRightIcon fontSize={'xl'} />
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </DashboardLayout>
    </>
  )
}