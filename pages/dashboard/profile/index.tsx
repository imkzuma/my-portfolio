import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useLayoutEffect } from 'react';
import useAuth from "@/utils/hooks/useAuth";

import { Avatar, AvatarBadge, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import { ChangePasswordTab, ChangeProfile, ChangeProfilePicture, ProfileTab } from "@/components/blog/profile";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ProfilePageProps } from "@/utils/interface/Profile";
import { OfficialApi } from "@/utils/api";

export default function ProfilePage() {
  const router = useRouter();
  const isAuth = useAuth();
  const [data, setData] = useState<ProfilePageProps | any>();
  const [username, setUsername] = useState<string>('');
  const [urlImage, setUrlImage] = useState<string>('');

  useLayoutEffect(() => {
    if (!isAuth) {
      router.replace('/auth/login');
    }
    const token = localStorage.getItem('auth-username');
    if (token) {
      setUsername(token);
    }

    const getData = async () => {
      try {
        const response = await OfficialApi.get(`/profile/${token}`);
        if (response.status === 200) {
          setData(response.data.data);
          const { image } = response.data.data;
          setUrlImage(image ? image : '');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }, [router, isAuth]);

  return (
    <>
      <Head>
        <title>Dashboard | Profile</title>
      </Head>
      <DashboardLayout>
        <Stack spacing={5} w={'full'}>
          <Flex w={'full'} justify={'space-between'} align={'center'}>
            <ChevronLeftIcon
              fontSize={'3xl'}
              onClick={() => router.push('/dashboard/blog')}
              cursor={'pointer'}
              display={{ base: 'block', lg: 'none' }}
            />
            <Text
              fontWeight={'semibold'}
              fontSize={'lg'}
            >
              Profile
            </Text>
            <ChevronLeftIcon
              color={'transparent'}
              fontSize={'3xl'}
              display={{ base: 'block', lg: 'none' }}
            />
          </Flex>
          <Flex gap={10}>
            <Stack>
              <Avatar
                size={{
                  base: 'xl',
                  lg: '2xl',
                }}
                name={data?.name}
                display={{ base: 'none', md: 'block' }}
                src={urlImage}
              >
                <AvatarBadge boxSize={12} bg='green.500' />
              </Avatar>
            </Stack>

            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              rounded={'xl'}
              minW={{ base: 'full', md: '75%' }}
              w={'fit-content'}
              p={{ base: 3, lg: 7 }}
            >
              <Tabs size={{ base: 'sm', md: 'md' }} isLazy>
                <TabList>
                  <Tab>
                    Profile
                  </Tab>
                  <Tab>
                    Change Profile
                  </Tab>
                  <Tab>
                    Change Profile Picture
                  </Tab>
                  <Tab>
                    Change Password
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <ProfileTab data={data} />
                  </TabPanel>
                  <TabPanel>
                    <ChangeProfile username={username} data={data} />
                  </TabPanel>
                  <TabPanel>
                    <ChangeProfilePicture username={username} setUrl={setUrlImage} />
                  </TabPanel>
                  <TabPanel>
                    <ChangePasswordTab username={username} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Flex>
        </Stack >
      </DashboardLayout >
    </>
  )
}