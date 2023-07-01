import { Box, Flex, Grid, GridItem, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import BoxContainer from "@/components/container";
import { HeadingText } from "@/components/typography/Heading";
import { ParagraphSecondary } from "@/components/typography/Paragraph";
import { HeadingSpan } from "@/components/typography/headingSpan";
import { ProfileProps } from "@/utils/interface/Profile";

interface HeroComponentsProps {
  data: ProfileProps;
  heroName: string;
  paragraph: string;
}

export default function HeroComponents({ data, heroName, paragraph }: HeroComponentsProps) {
  return (
    <Flex
      justify={'center'} align={'center'}
      w={'full'}
      minH={{ base: '65vh', lg: '80vh' }}
      bg={useColorModeValue('white', 'gray.800')}
      pos={'relative'}
    >
      <Box
        bgImage={'url(/img/lingkaran.png)'}
        bgSize={'contain'}
        bgRepeat={'no-repeat'}
        pos={'absolute'}
        h={'869px'} w={'869px'}
        bottom={0}
      />

      <BoxContainer>
        <Grid
          templateColumns={'repeat(12, 1fr)'}
          alignItems={'center'}
          pos={'relative'}
        >
          <GridItem
            colSpan={{
              base: 12,
              lg: 8
            }}
            w={{
              base: 'full',
              lg: '60%'
            }}
          >
            <Stack as={motion.div}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1, transition: { duration: 0.8, type: "ease" } }}
              spacing={4}
            >
              <HeadingSpan title="MY BLOG" />
              <HeadingText>
                Iam <u>{data?.name}</u> and this is my {heroName}
              </HeadingText>
              <ParagraphSecondary>
                {data?.about}
              </ParagraphSecondary>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={{
              base: 12,
              lg: 4
            }}
          >
            <Image as={motion.img}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1, transition: { duration: 0.8, type: "ease" } }}
              src={data?.image}
              alt={data?.name}
              h={550}
              display={{ base: 'none', lg: 'block' }}
            />
          </GridItem>
        </Grid>
      </BoxContainer>
    </Flex>
  )
}