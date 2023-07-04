import BoxContainer from "@/components/container";
import { Logo } from "@/components/logo";
import { ParagraphPrimary, ParagraphSecondary } from "@/components/typography/Paragraph";
import { OfficialApi } from "@/utils/api";
import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setData('')
    try {
      setLoading(true);
      const response = await OfficialApi.get(`/profile/${search}`);

      if (response.status === 200) {
        setData(response.data.data)
      }
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Portfolio | Home Page</title>
      </Head>
      <BoxContainer>
        <Flex
          w={'full'}
          align={'center'}
          justify={'center'}
          minH={'40vh'}
          py={10}
        >
          <Stack w={{ base: 'full', md: 'lg' }} spacing={10}>
            <Flex alignItems={'center'} justify={'center'} gap={2} fontWeight={'semibold'} color={'blue.400'}>
              <Logo py={2} />
              Portfolio.
            </Flex>
            <Stack spacing={8} align={'center'}>
              <FormControl>
                <FormLabel>Cari User</FormLabel>
                <Input
                  py={6}
                  type="text"
                  placeholder="Cari Akun...."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormControl>
              {loading && (
                <Spinner
                  size={'xl'}
                  thickness='4px'
                  speed='0.65s'
                />
              )}
              {data !== null ? (
                <Flex as="a"
                  href={`/${search}`}
                  align={'center'}
                  gap={8}
                  w={'full'}
                >
                  <Box
                    w={'100px'} maxW={'100px'}
                    h={'100px'} maxH={'100px'}
                    bg={'gray.100'}
                    rounded={'lg'}
                  >
                    <Image
                      src={data?.image}
                      alt={data?.name}
                      objectFit={'cover'}
                      objectPosition={'top'}
                      w={'100px'} h={'100px'}
                    />
                  </Box>
                  <Stack spacing={0}>
                    <ParagraphPrimary
                      fontSize={'xl'}
                      fontWeight={'semibold'}
                    >
                      {data?.name}
                    </ParagraphPrimary>
                    <Text color={'gray.500'}>
                      {data?.position} at {data?.education}
                    </Text>
                  </Stack>
                </Flex>
              ) : (
                <ParagraphSecondary>Tidak ada data</ParagraphSecondary>
              )}
              <Button
                bg={useColorModeValue('blue.300', 'blue.500')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('blue.400', 'blue.600')
                }}
                w={"full"}
                py={6}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Stack>
            <Flex justify={'center'} gap={5}>
              <Text as="a" href="/auth/login" color={'blue.500'}>Login</Text>
              |
              <Text as="a" href="/auth/register">Register</Text>
            </Flex>
          </Stack>
        </Flex>
      </BoxContainer>
    </>
  )
}