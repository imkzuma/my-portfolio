import { ParsedDateTime } from "@/utils/parsingDateTime";
import { Box, Button, Card, CardBody, Flex, Icon, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";

interface CardSectionBlogProps {
  image: string;
  title: string;
  postDate: string;
  slug: string;
}

export default function CardSectionBlog({ image, title, postDate, slug }: CardSectionBlogProps) {
  return (
    <Card
      as="a"
      href={`/blog/post/tudemaha/${slug}`}
      maxW={'full'}
      boxShadow={'none'}
      bg={'transparent'}
    >
      <CardBody p={{ base: 0, md: 5 }}>
        <Box maxW={'full'} maxH={'300px'}>
          <Image
            src={image}
            w={'full'} rounded={'md'}
            minH={'300px'} maxH={'300px'}
            objectFit={'cover'}
            objectPosition={'top'}
            alt={title}
          />
        </Box>
        <Stack spacing={3} py={4}>
          <Text
            fontSize={"xl"}
            fontWeight={'semibold'}
            color={useColorModeValue('blue.500', 'blue.400')}
          >
            {title}
          </Text>
          <Flex
            align={"center"}
            gap={3}
          >
            <Icon as={BsClock} fontWeight={'semibold'} color={useColorModeValue('gray.500', 'gray.600')} />
            <Text color={useColorModeValue('gray.500', 'gray.500')} fontWeight={'semibold'}>
              Posted at {ParsedDateTime(postDate)}
            </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  )
}