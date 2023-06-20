import MainLayout from "@/layouts/MainLayout";
import { OfficialApi } from "@/utils/api";
import { ParsedDateTime } from "@/utils/parsingDateTime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Icon, Image, Skeleton, SkeletonText, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router"
import { useLayoutEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import parse from 'html-react-parser';
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function BlogDetail() {
  const router = useRouter();
  const { username, slug } = router.query;
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    const getData = async () => {
      const encodedSlug = encodeURIComponent(slug as string);
      try {
        setLoading(true);
        const response = await OfficialApi.get(`/post/${username}/${encodedSlug}`);
        if (response.status === 200) {
          const { data } = response.data;
          setData(data);
        }
      } catch (error) {
        //console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (username && slug) {
      getData();
    }
  }, [slug, username]);

  return (
    <>
      <Head>
        <title>Portfolio | Blog</title>
      </Head>
      <MainLayout username={username as string}>
        <Flex
          w={'full'}
          align={'center'}
          justify={'center'}
        >

          <Flex
            w={{ base: 'full', lg: '60%', xl: '45%' }}
            align={'center'}
            justify={'center'}
            p={10}
          >
            {loading && (
              <Stack>
                <Skeleton height={'50px'} />
                <Skeleton height={'400px'} />
                <SkeletonText height={'400px'} />
              </Stack>
            )}
            <Stack spacing={4} display={loading ? 'none' : 'block'} transition="all ease .3s">
              <Flex as="a" href={`/blog/${username}`} align={'center'} gap={1} w={'fit-content'}>
                <ChevronLeftIcon fontSize={'3xl'} />
                <Text fontWeight={'semibold'} fontSize={'lg'}>
                  Back
                </Text>
              </Flex>
              <Heading
                fontSize={{ base: '2xl', lg: '4xl' }}
                fontWeight={'black'}
              >
                {data?.title}
              </Heading>
              <Flex align={'center'} gap={3} color={useColorModeValue('gray.500', 'gray.500')}>
                <Icon as={BsClock} />
                <Text>
                  Created at {ParsedDateTime(data?.createdAt)}
                </Text>
              </Flex>
              <Image
                src={data?.image}
                alt={data?.title}
                w={'full'}
                rounded={'lg'}
              />
              {data?.content && parse(String(data?.content))}

            </Stack>
          </Flex>
        </Flex>
      </MainLayout>
    </>
  )
}