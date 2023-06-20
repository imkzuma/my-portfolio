import { Flex, Box, useColorModeValue, Text, Heading, Grid, GridItem, Stack, Button, Divider } from "@chakra-ui/react";

export default function HeroBlogHome() {
  return (
    <Box p={2}>
      <Flex
        w="full"
        h="50vh"
        bgGradient='linear(to-b, blue.600, blue.700, blue.900)'
        justifyContent={'center'}
        alignItems={'center'}
        rounded={'md'}
        color={'white'}
      >
        <Box textAlign={'center'}>
          <Heading as="h1" size="2xl" mb={4}>
            My Blog
          </Heading>
          <Text fontSize="xl">
            A collection of my thoughts and musings on various topics.
          </Text>
        </Box>
      </Flex>
      <Flex
        w={'full'}
        px={{ base: 5, lg: '10rem' }}
        py={20}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack w={'40%'} gap={5}>
          <Stack direction={'column'} gap={5}>
            <Stack>
              <Text fontSize={'26px'} fontWeight={'semibold'}>
                What is React Hooks used for, in React App? Should i learn it?
              </Text>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                Thu, Jun 23 2022
              </Text>
            </Stack>
            <Text>
              Last month we had the first-ever Chakra UI Hackathon, which we tagged the Chakrathon 22. The Hackathon was held from May 3rd to May 20th, 2022, with participants from various parts of the world involved.
            </Text>
            <Button w='fit-content' h='fit-content' py={2}>
              Read More
            </Button>
          </Stack>
          <Divider />
        </Stack>
      </Flex>
    </Box>
  )
}