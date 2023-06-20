import CardListBlog from "@/components/blog/card/CardList";
import BoxContainer from "@/components/container";
import HeroComponents from "@/components/hero";
import MainLayout from "@/layouts/MainLayout";
import { OfficialApi } from "@/utils/api";
import { useProfile } from "@/utils/hooks/useProfile";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, Grid, GridItem, Input, InputGroup, InputLeftElement, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useState, useLayoutEffect } from 'react';

export default function BlogList() {
  const [data, setData] = useState<string[]>();
  const [countPage, setCountPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const username = 'gungkrisna';
  const profile = useProfile(username);

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
    const getData = async () => {
      try {
        const response = await OfficialApi.get(`/post/${username}?page=${currentPage}`);
        const { data } = response;
        setData(data.data.posts);
        setCountPage(data.data.pagination.page_count);

      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }, [currentPage]);

  const btnBlog = useColorModeValue('blue.500', 'blue.600');

  return (
    <>
      <Head>
        <title>My Portfolio | Blog</title>
      </Head>
      <MainLayout>
        <HeroComponents name={profile?.name} heroName="Blog" paragraph="Blog" />
        <BoxContainer>
          <Stack py={10} spacing={10}>
            <Stack py={5}>
              <InputGroup>
                <InputLeftElement h={14}>
                  <SearchIcon color={useColorModeValue('gray.500', 'gray.600')} />
                </InputLeftElement>
                <Input
                  type="text"
                  bg={useColorModeValue('gray.200', 'gray.900')}
                  h={14}
                  placeholder="Search an artikel"
                />
              </InputGroup>
              <Grid templateColumns={'repeat(6, 1fr)'} gap={5}>
                <GridItem
                  colSpan={{
                    base: 3,
                    lg: 2
                  }}
                >
                  <Select
                    placeholder="Choose Category"
                    bg={useColorModeValue('gray.200', 'gray.900')}
                    h={14}
                  />
                </GridItem>
                <GridItem
                  colSpan={{
                    base: 3,
                    lg: 1
                  }}
                >
                  <Select
                    placeholder="Order By"
                    bg={useColorModeValue('gray.200', 'gray.900')}
                    h={14}
                  />
                </GridItem>
              </Grid>
            </Stack>

            <Stack>
              <Stack spacing={5}>
                {data?.map((item: any, index: number) => {
                  if (index < 6) {
                    return (
                      <Stack key={index} spacing={6}>
                        <CardListBlog
                          image={item.image}
                          postDate={item.createdAt}
                          slug={item.slug}
                          username={'tudemaha'}
                          title={item.title}
                        >
                          <Button as="a"
                            href={`/blog/post/${username}/${item.slug}`}
                            variant={'ghost'}
                            w={'fit-content'}
                            p={0}
                            color={btnBlog}
                            gap={1}
                            _hover={{
                              bg: 'transparent',
                              gap: 3,
                              transition: 'all ease-in .3s'
                            }}
                            transition={'all ease-out .3s'}
                          >
                            Baca Selengkapnya <ChevronRightIcon fontSize={'xl'} />
                          </Button>
                        </CardListBlog>
                        <Divider />
                      </Stack>
                    )
                  }
                })}
              </Stack>
              <Flex justify={'space-between'} align={'center'} >
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
          </Stack>
        </BoxContainer>
      </MainLayout>
    </>
  )
}