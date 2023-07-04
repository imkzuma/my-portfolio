import AddForumComponents from "@/components/forum/AddForum";
import MainLayout from "@/layouts/MainLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AddThread() {
  const router = useRouter();
  const { slug, username } = router.query;

  const handleBack = () => {
    router.push({
      pathname: "/blog/post/[username]/thread",
      query: {
        username: username, slug: slug
      }
    });
  }

  return (
    <>
      <Head>
        <title>Portfolio | Blog</title>
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
                <Text>Threads</Text>
                <ChevronLeftIcon bg={'transparent'} color={'transparent'} />
              </Flex>

              <AddForumComponents slug={slug as string} username={username as string} />
            </Stack>
          </Flex>
        </MainLayout>
      </main>
    </>
  )
}