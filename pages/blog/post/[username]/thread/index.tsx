import { TitleThread } from "@/components/forum/TitleThread";
import CardListForum from "@/components/forum/card/CardListForum";
import MainLayout from "@/layouts/MainLayout";
import { OfficialApi } from "@/utils/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Skeleton, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Thread() {
  const router = useRouter();
  const { slug, username } = router.query;

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        if (slug && username) {
          const response = await OfficialApi.get(`/thread/${slug}?page=${pages}`);

          if (response.status === 200) {
            setData(response.data.data.threads)
            setTotalPage(response.data.data.pagination.page_count)
          }
        }
      } catch (error) {
        const { response } = error as any;

        if (response.status === 404) {
          setData(null)
        }
      } finally {
        setLoading(false);
      }
    }
    if (slug && username) {
      getData();
    }

  }, [slug, pages, router, username]);

  const handlePrevPage = () => {
    if (pages > 1) {
      setPages(pages - 1);
    }
  }

  const handleNextPage = () => {
    if (pages >= 1 && totalPage && pages < totalPage) {
      setPages(pages + 1);
    }
  }

  const handleNewThread = () => {
    router.push({
      pathname: "/blog/post/[username]/thread/add",
      query: {
        slug: slug, username: username
      }
    });
  }

  const handleBack = () => {
    router.push(`/blog/post/${username}/${slug}`);
  }

  const bgLoading = useColorModeValue('white', 'gray.800');
  const bgPrimary = useColorModeValue('blue.500', 'blue.900');
  const borderPrimary = useColorModeValue('blue.500', 'blue.600');
  const textSecondary = useColorModeValue('gray.300', 'gray.500');
  const textPage = useColorModeValue('gray.500', 'gray.400');

  if (loading) {
    return (
      <Flex
        w={'full'}
        align={'center'}
        justify={'center'}
        h={'100vh'}
      >
        <Spinner
          size={'xl'}
          thickness='4px'
          speed='0.65s'
        />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>Portfolio | Forum</title>
      </Head>
      <main>
        <MainLayout username={username as string}>
          <Flex
            w={'full'}
            justify={'center'}
            py={10}
            minH={'100vh'}
            p={{ base: 5, md: 8 }}
          >
            <Stack spacing={5} w={{ base: 'full', md: '80%', lg: '60%' }}>
              <Flex
                cursor={'pointer'}
                justify={{ base: "space-between", md: 'start' }} align={'center'} gap={3}
                onClick={handleBack}
              >
                <ChevronLeftIcon fontSize={'3xl'} />
                <Text>Blog</Text>
                <ChevronLeftIcon bg={'transparent'} color={'transparent'} />
              </Flex>

              {data && <TitleThread slug={slug as string} />}

              <Flex onClick={handleNewThread}
                cursor={'pointer'}
                justifyContent={'space-between'}
                alignItems={'center'}
                py={5} px={{ base: 5, md: 10 }}
                bg={bgPrimary}
                rounded={'lg'}
                gap={5}
                border={'1px'}
                borderColor={borderPrimary}
              >
                <Stack spacing={1}>
                  <Text fontSize={'xl'} fontWeight={'semibold'} color={'white'}>
                    Create a new thread for this blog
                  </Text>
                  <Text
                    fontSize={'sm'}
                    color={textSecondary}
                  >
                    Create the new thread here and share it with the world
                  </Text>
                </Stack>
                <ChevronRightIcon fontSize={'3xl'} color={'white'} />
              </Flex>
              {loading && (
                Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <Box key={index} bg={bgLoading} boxShadow={'2xl'} rounded={'md'} p={6}>
                      <Stack spacing={4}>
                        <Skeleton height="50px" />
                        <Skeleton height="50px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                      </Stack>
                    </Box>
                  )
                })
              )}
              {data?.length > 0
                ?
                data?.map((item: any, index: number) => {
                  return (
                    <CardListForum key={index} data={item} slug={slug as string} username={username as string} />
                  )
                })
                : (
                  <Text
                    textAlign={'center'}
                  >
                    No Threads Yet.
                  </Text>
                )
              }

              <Flex justifyContent={'space-between'} gap={5} alignItems={'center'} py={5}>
                <Text color={textPage}>
                  Page {pages} of {totalPage}
                </Text>
                <Flex gap={5}>
                  <Button
                    colorScheme="blue"
                    isDisabled={pages === 1}
                    onClick={handlePrevPage}
                  >
                    <ChevronLeftIcon
                      fontSize={'xl'}
                    />
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleNextPage}
                    isDisabled={pages === totalPage}
                  >
                    <ChevronRightIcon
                      fontSize={'xl'}
                    />
                  </Button>
                </Flex>
              </Flex>
            </Stack>
          </Flex>
        </MainLayout>
      </main>
    </>
  )
}