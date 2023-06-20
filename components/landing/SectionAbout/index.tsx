import { Box, Flex, Grid, GridItem, Heading, Image, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { HeadingText } from "@/components/typography/Heading";
import { ParagraphSecondary } from "@/components/typography/Paragraph";
import { HeadingSpan } from "@/components/typography/headingSpan";
import { motion } from "framer-motion";
import { ChildListAnimate, ParentListAnimate } from "@/components/animation/ListTypeAnimate";

const SingleCard = ({ title, description, image }: { title: string, description: string, image: string }) => {
  return (
    <Box
      pos={'relative'}
      maxH={{ base: '355px', lg: '743px' }} maxW={{ base: 'full', lg: '784px' }}
    >
      <Image
        src={image}
        alt={title}
        rounded={'xl'}
        objectFit={'cover'}
        w={{ base: 'full', lg: '784px' }}
        h={{ base: '355px', lg: '743px' }}
      />
      <Stack
        w={'full'}
        pos={'absolute'}
        bottom={0}
        left={0}
        p={{ base: 4, lg: 10 }}
        spacing={4}
        background={'linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.8) 100%)'}
        rounded={'xl'}
      >
        <Heading color={'white'}>
          {title}
        </Heading>
        <ParagraphSecondary>
          {description}
        </ParagraphSecondary>
      </Stack>
    </Box>
  )
}

const DoubleCard = ({ title, description, image }: { title: string, description: string, image: string }) => {
  return (
    <Box
      pos={'relative'}
      maxH={'355px'}
      maxW={{ base: 'full', lg: '784px' }}
    >
      <Image
        src={image}
        alt={title}
        rounded={'xl'}
        objectFit={'cover'}
        objectPosition={'center'}
        w={{ base: 'full', lg: '784px' }}
        h={'355px'}
      />
      <Stack
        pos={'absolute'}
        bottom={0}
        left={0}
        h={'355px'} w={'full'}
        background={'linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.8) 100%)'}
        rounded={'xl'}
      >
        <Stack
          pos={'absolute'}
          bottom={0}
          w={'auto'}
          p={{ base: 4, lg: 8 }}
        >
          <Heading color={'white'}>
            {title}
          </Heading>
          <ParagraphSecondary>
            {description}
          </ParagraphSecondary>
        </Stack>
      </Stack>
    </Box>
  )
}

export default function SectionAbout() {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      w={'full'}
      py={{ base: 10, lg: 0 }}
    >
      <Stack
        spacing={10}
        w={'full'}
      >
        <Stack as={motion.div}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.8, type: "ease" } }}
          textAlign={{ base: 'start', md: 'center' }}
          align={{ base: 'start', md: 'center' }}
        >
          <HeadingSpan title="HIGHTLIGHTED PORTOFOLIO" />
          <HeadingText>
            Searching for The Best? Sure, Here It Is!
          </HeadingText>
          <ParagraphSecondary w={{ base: 'full', md: '3xl' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, doloribus doloremque, odit, quisquam explicabo eos quasi laboriosam modi quam in et dolores? Accusamus fugit cum praesentium asperiores facere aspernatur enim.
          </ParagraphSecondary>
        </Stack>

        <Grid as={motion.ul}
          variants={ParentListAnimate}
          initial="hidden"
          whileInView="show"
          templateColumns={'repeat(2,1fr)'}
          gap={8}
        >
          <GridItem as={motion.li}
            variants={ChildListAnimate}
            listStyleType={'none'}
            colSpan={{
              base: 2,
              lg: 1
            }}
          >
            <SingleCard
              image="/img/portfolio/kisahnesia.png"
              title="Kisahnesia"
              description="This project is about a website that gathers all unique story from Indonesia, making it as a vast story library. User also can submit their regional unique story."
            />
          </GridItem>
          <GridItem as={motion.li}
            variants={ChildListAnimate}
            listStyleType={'none'}
            colSpan={{
              base: 2,
              lg: 1
            }}
          >
            <Stack spacing={8}>
              <DoubleCard
                image="/img/portfolio/victor.png"
                title="The Viator"
                description="A routing website that defines the best route to fish. Work by integrating many underwater sensor to produce best results."
              />
              <DoubleCard
                image="/img/portfolio/illustrationist.png"
                title="Illustrationist"
                description="A website that turns your prompt into any ancient style paper drawing. May useful to retell past stories."
              />
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </Flex >
  )
}