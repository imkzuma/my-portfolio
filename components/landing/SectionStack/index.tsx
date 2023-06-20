import { ChildListAnimate, ParentListAnimate } from "@/components/animation/ListTypeAnimate";
import BoxContainer from "@/components/container";
import { HeadingText } from "@/components/typography/Heading";
import { ParagraphSecondary } from "@/components/typography/Paragraph";
import { HeadingSpan } from "@/components/typography/headingSpan";
import { Box, Button, Flex, Grid, GridItem, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function SectionStack() {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      w={'full'}
      pos={'relative'}
      minH={'869px'}
      overflow={'hidden'}
    >
      <Box
        bgImage={'url(/img/lingkaran.png)'}
        bgSize={'contain'}
        bgRepeat={'no-repeat'}
        pos={'absolute'}
        h={'869px'} w={'869px'}
        right={'-300px'}
      />

      <BoxContainer>
        <Grid
          gridTemplateColumns={'repeat(2, 1fr)'}
          alignItems={'center'}
          gap={10}
          pos={'relative'}
        >
          <GridItem as={motion.div}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 1 } }}
            colSpan={{
              base: 2,
              md: 1
            }}
          >
            <Image
              src={'/img/stack/stack.png'}
              alt={'stack'}
            />
          </GridItem>
          <GridItem
            colSpan={{
              base: 2,
              md: 1
            }}
          >
            <Stack as={motion.ul}
              variants={ParentListAnimate}
              initial="hidden"
              whileInView="show"
              spacing={5}
            >
              <Box as={motion.li}
                variants={ChildListAnimate}
                listStyleType={'none'}
              >
                <HeadingSpan
                  title={' MY STACKS'}
                />
              </Box>
              <Box as={motion.li}
                variants={ChildListAnimate}
                listStyleType={'none'}
              >
                <HeadingText>
                  I&apos;ve mastered many stacks and languages!
                </HeadingText>
              </Box>

              <ParagraphSecondary as={motion.li}
                variants={ChildListAnimate}
                listStyleType={'none'}
                w={{ base: 'full', md: 'xl' }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptas, doloribus doloremque, odit, quisquam explicabo eos
                quasi laboriosam modi quam in et dolores? Accusamus fugit
                cum praesentium asperiores facere aspernatur enim.
              </ParagraphSecondary>

              <Button as={motion.button}
                variants={ChildListAnimate}
                variant={'outline'}
                w={'fit-content'}
                px={10}
                py={6}
                color={useColorModeValue('gray.500', 'gray.500')}
                fontWeight={'normal'}
              >
                ABOUT
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </BoxContainer>
    </Flex >
  )
}