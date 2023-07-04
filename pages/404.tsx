import { Button, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Head from "next/head"

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Portfolio | Page Not Found</title>
      </Head>
      <main>
        <Flex
          w={'full'}
          h={'100vh'}
          align={'center'}
          justify={'center'}
          p={{
            base: 5, md: 0
          }}
        >

          <Stack textAlign={'center'} align={'center'}>
            <Heading fontSize={{ base: '8xl', lg: '9xl' }}>
              404
            </Heading>
            <Text fontSize={{ md: '2xl' }}>
              OOPS! Page Not Found
            </Text>

            <Text
              w={{ base: 'full', md: '70%' }}
              color={useColorModeValue('gray.500', 'gray.500')}
              fontSize={{ md: 'lg' }}
              pb={5}
            >
              Sorry, the page you are looking for does not exist. If you think something is broken, report a problem.
            </Text>
            <Button as="a" href="/"
              colorScheme="blue"
              p={6}
            >
              Return Home
            </Button>
          </Stack>

        </Flex>
      </main>
    </>
  )
}