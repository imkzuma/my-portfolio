import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { useProfile } from "@/utils/hooks/useProfile";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { OfficialApi } from "@/utils/api";

export default function ProfileDetail() {
  const router = useRouter();
  const { username } = router.query;

  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const response = await OfficialApi.get(`/profile/${username}`);
        const { data } = response;
        if (response.status === 200) {
          setProfile(data.data);
        }
      } catch (error) {
        router.replace('/404');
      } finally {
        setLoading(false);
      }
    }
    if (username) {
      getProfile();
    }

  }, [username, router]);

  if (loading) {
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
        <title>Portolio | Profile Detail</title>
      </Head>
    </>
  )
}