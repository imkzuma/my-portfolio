import BoxContainer from '@/components/container'
import SectionAbout from '@/components/landing/SectionAbout'
import SectionBlog from '@/components/landing/SectionBlog'
import SectionProject from '@/components/landing/SectionProject'
import SectionStack from '@/components/landing/SectionStack'
import HeroLandingPage from '@/components/landing/hero'
import MainLayout from '@/layouts/MainLayout'
import { OfficialApi } from '@/utils/api'
import { useProfile } from '@/utils/hooks/useProfile'
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useLayoutEffect, useState } from 'react'

export default function Home() {
  const router = useRouter();
  const { username } = router.query;

  const [dataBlog, setDataBlog] = useState<any>();
  const [loadingBlog, setLoadingBlog] = useState<boolean>(false);

  const [dataProfile, loadingProfile] = useProfile(username as string);

  useLayoutEffect(() => {
    if (dataProfile === null) {
      router.replace('/404');
    }

    const getData = async () => {
      try {
        setLoadingBlog(true);
        const response = await OfficialApi.get(`/post/${username}`);
        const { data } = response;

        if (data.code === 200) {
          setDataBlog(data.data.posts);
        }
      } catch (error) {
        //console.log(error);
      } finally {
        setTimeout(() => {
          setLoadingBlog(false);
        }, 1000);
      }
    }
    if (username) {
      getData();
    }
  }, [username, dataProfile, router]);

  if (loadingBlog || loadingProfile) {
    return (
      <Flex
        align={'center'}
        justify={'center'}
        w={'full'}
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
        <title>Portfolio</title>
      </Head>
      <main>
        <MainLayout username={username as string}>
          <Stack spacing={{ base: 14, md: '8rem' }}>
            <BoxContainer>
              <Stack spacing={{ base: 14, md: '8rem' }}>
                <HeroLandingPage
                  data={dataProfile}
                  username={username as string}
                />
                <SectionAbout />
              </Stack>
            </BoxContainer>

            <SectionProject />

            <Stack>
              <BoxContainer>
                <SectionBlog
                  data={dataBlog}
                  username={username as string}
                />
              </BoxContainer>

              <SectionStack />
            </Stack>

          </Stack>
        </MainLayout>
      </main>
    </>
  )
}
