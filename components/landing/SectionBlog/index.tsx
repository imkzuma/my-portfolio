import { Box, Flex, Grid, GridItem, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import CardSectionBlog from "./CardSectionBlog";
import { motion } from "framer-motion";
import { ParentListAnimate, ChildListAnimate } from "@/components/animation/ListTypeAnimate";
import { HeadingSpan } from "@/components/typography/headingSpan";
import { HeadingText } from "@/components/typography/Heading";
import { ParagraphSecondary } from "@/components/typography/Paragraph";

export default function SectionBlog({ data }: { data: any }) {
  return (
    <Box>
      <Stack spacing={7}>
        <Stack as={motion.div}
          initial={{ y: -40, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
            }
          }}
          spacing={4}
          align={{ base: 'start', md: 'center' }}
          textAlign={{ base: 'start', md: 'center' }}
        >
          <Stack spacing={1}>
            <HeadingSpan title="BLOG - LATEST POST" />
            <HeadingText>
              Searching Some Insights? Just Look at My Blog!
            </HeadingText>
          </Stack>
          <ParagraphSecondary
            w={{ base: 'full', md: '3xl' }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, doloribus doloremque, odit, quisquam explicabo eos quasi laboriosam modi quam in et dolores? Accusamus fugit cum praesentium asperiores facere aspernatur enim.
          </ParagraphSecondary>
        </Stack>

        <Grid as={motion.ul}
          variants={ParentListAnimate}
          initial="hidden"
          whileInView="show"
          templateColumns={'repeat(3,1fr)'}
          gap={5}
        >
          {data?.map((item: any, index: number) => {
            if (index < 3) {
              return (
                <GridItem as={motion.li}
                  variants={ChildListAnimate}
                  key={index}
                  colSpan={{ base: 3, md: 1 }}
                  listStyleType={'none'}
                  _hover={{
                    marginTop: '-10px',
                    marginBottom: '10px',
                    transition: 'margin 0.3s ease'
                  }}
                  transition={'margin 0.3s ease'}
                >
                  <CardSectionBlog
                    image={item.image}
                    title={item.title}
                    postDate={item.createdAt}
                    slug={item.slug}
                  />
                </GridItem>
              )
            }
          })}
        </Grid>
      </Stack>
    </Box >
  )
}