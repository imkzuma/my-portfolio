import { Box, Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import BoxContainer from "@/components/container";
import { SectionWithBg } from "../bgSection";

export default function HeaderFooter() {
  return (
    <Box w={'full'}>
      <SectionWithBg bg="/img/footer.png">
        <BoxContainer>
          <Stack
            spacing={3}
            align={'center'}
            textAlign={'center'}
          >
            <Text
              color={'white'}
              fontWeight={'semibold'}
              fontSize={{ base: '3xl', lg: '5xl' }}
            >
              Want To Hire Me?
            </Text>
            <Text
              color={'white'}
              w={{ base: 'full', md: 'xl' }}
              lineHeight={1.8}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              All you need to do is easy. Just hit the button and you will redirected to my whatsapp. Then you can introduce yourself and explain your need. Nothing can be simpler than this!
            </Text>
            <Button
              variant={'outline'}
              w={'fit-content'}
              px={8} py={6}
              color={'white'}
              _hover={{
                bg: 'white',
                color: 'gray.800'
              }}
            >
              Whatsapp Me
            </Button>
          </Stack>
        </BoxContainer>
      </SectionWithBg>
    </Box >
  )
}