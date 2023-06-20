import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, GridItem, Icon, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { HeadingText } from "@/components/typography/Heading";
import { ParagraphSecondary } from "@/components/typography/Paragraph";
import { HeadingSpan } from "@/components/typography/headingSpan";
import { BsChevronRight } from "react-icons/bs";
export default function SectionAbout() {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      w={'full'}
      py={{ base: 10, lg: 0 }}
    >
      <Grid
        gridTemplateColumns={'repeat(12, 1fr)'}
        gap={5}
        alignItems={'center'}
      >
        <GridItem
          gridColumn={{
            base: 'span 12',
            lg: 'span 6'
          }}
        >
          <Stack
            direction={'column'}
            gap={2}
          >
            <HeadingSpan title={'ABOUT ME'} />
            <HeadingText>
              I&apos;ve been developing websites since 2021
            </HeadingText>
            <ParagraphSecondary>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, doloribus
              doloremque, odit, quisquam explicabo eos quasi laboriosam modi quam in et dolores?
              Accusamus fugit cum praesentium asperiores facere aspernatur enim.
            </ParagraphSecondary>
            <Flex
              w={'fit-content'}
              h={'fit-content'}
              py={3}
              variant={'unstyled'}
              as={Button}
              gap={2}
              _hover={{
                gap: 5,
                color: useColorModeValue('blue.400', 'blue.500'),
                transition: 'all 0.5s ease'
              }}
              transition={'all 0.5s ease'}
            >
              Read More <Icon as={BsChevronRight} />
            </Flex>
          </Stack>
        </GridItem>

        <GridItem gridColumn={{ lg: 'span 2' }}>
          <Spacer />
        </GridItem>

        <GridItem
          gridColumn={{
            base: 'span 12',
            lg: 'span 4'
          }}
        >

        </GridItem>
      </Grid>
    </Flex>
  )
}