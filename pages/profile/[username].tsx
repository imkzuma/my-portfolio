import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { Box, Flex, Grid, GridItem, Heading, Icon, Image, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { OfficialApi } from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";
import BoxContainer from "@/components/container";
import { BsBookFill, BsGeoAltFill, BsInfoCircleFill, BsInstagram, BsWhatsapp } from "react-icons/bs";

const DataDetail = ({ icon, title, content }: any) => {
  return (
    <Stack>
      <Flex
        align={'top'}
        gap={3}
        fontWeight={'semibold'}
        color={'blue.500'}
      >
        <Icon as={icon} />
        <Stack>
          <Text>{title}</Text>
          <Text lineHeight={1.8} color={useColorModeValue("gray.500", "gray.500")}>
            {content}
          </Text>
        </Stack>
      </Flex>
    </Stack>
  )
}

const ProfileName = ({ name, position, education, ...rest }: any) => {
  return (
    <Stack spacing={4} {...rest}>
      <Heading
        color={useColorModeValue('black', 'white')}
        fontSize={{
          base: "3xl",
          md: "4xl"
        }}
      >
        {name}
      </Heading>
      <Text
        color={"blue.500"}
        fontWeight={'semibold'}
        fontSize={'xl'}
      >
        {position} at {education}
      </Text>
    </Stack >
  )
}

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
      <main>
        <MainLayout username={username as string}>
          <Box w={'full'} minH={'100vh'}>
            <Box
              w={'full'}
              h={'400px'}
              display={{
                base: "none",
                md: "block"
              }}
            >
              <Box
                bgImage={"/img/hero-profile.png"}
                bgRepeat={'no-repeat'}
                bgPosition={'center'}
                bgSize={'cover'}
                w={'full'}
                h={'full'}
              />
            </Box>
            <BoxContainer>
              <Grid
                gridTemplateColumns={'repeat(12, 1fr)'}
                py={{ base: 14, md: 0 }}
                gap={{ md: 8, lg: 14 }}
              >
                <GridItem
                  colSpan={{
                    base: 12,
                    md: 3
                  }}
                >
                  <Stack
                    spacing={10}
                    m={{ base: 'auto', md: 0 }}
                    mt={{ base: 0, md: '-2rem', lg: '-5rem' }}
                    maxW={{ base: 'full', xl: "300px" }}
                    minW={{ base: 'full', xl: "300px" }}
                  >
                    <Image
                      src={profile?.image}
                      alt={profile?.name}
                      objectFit={'cover'}
                      w={'full'}
                      rounded={"md"}
                    />

                    <ProfileName
                      name={profile?.name}
                      education={profile?.education}
                      position={profile?.position}
                      display={{ base: "block", md: "none" }}
                    />

                    <Grid gap={{ base: 0, md: 10 }} gridTemplateColumns={'repeat(2,1fr)'}>
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <DataDetail icon={BsInstagram} title="Instagram" content={profile?.instagram} />
                      </GridItem>
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <DataDetail icon={BsWhatsapp} title="whatsapp" content={profile?.wa} />
                      </GridItem>
                    </Grid>
                  </Stack>
                </GridItem>

                <GridItem
                  colSpan={{
                    base: 12,
                    md: 9
                  }}
                  py={{ base: 0, md: 10 }}
                >
                  <Stack spacing={10}>
                    <ProfileName
                      name={profile?.name}
                      education={profile?.education}
                      position={profile?.position}
                      display={{ base: "none", md: "block" }}
                    />

                    <Grid gridTemplateColumns={'repeat(12, 1fr)'}>
                      <GridItem colSpan={{ base: 6, md: 5 }}>
                        <DataDetail
                          icon={BsGeoAltFill}
                          title="Address"
                          content={profile?.address}
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 6, md: 5 }}>
                        <DataDetail icon={BsBookFill} title="Education" content={profile?.education} />
                      </GridItem>
                    </Grid>
                    <DataDetail icon={BsInfoCircleFill} title="About Me" content={profile?.about} />
                  </Stack>
                </GridItem>
              </Grid>
            </BoxContainer>
          </Box>
        </MainLayout>
      </main >
    </>
  )
}