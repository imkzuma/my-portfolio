import { Flex, Grid, GridItem, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import BoxContainer from "../container";

export default function HeroComponents({ name, heroName, paragraph }: { name: string, heroName: string, paragraph: string }) {
  return (
    <Flex
      justify={'center'} align={'center'}
      w={'full'}
      minH={{ base: '65vh', lg: '80vh' }}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <BoxContainer>
        <Grid
          templateColumns={'repeat(12, 1fr)'}
          alignItems={'center'}
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
            <Stack spacing={4} >
              <Text
                fontSize={{ base: '3xl', lg: '5xl' }}
                fontWeight={'semibold'}
              >
                Iam <u>{name}</u> and this is my {heroName}
              </Text>
              <Text
                lineHeight={1.8}
                fontSize={{ base: 'md', md: 'lg' }}
                color={useColorModeValue('gray.500', 'gray.400')}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque modi harum
                voluptate expedita, vel ducimus dolorum doloremque sit vero omnis eos
                aspernatur consequatur dolore et eum eligendi velit deserunt nisi?
              </Text>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={{
              base: 12,
              lg: 4
            }}
          >
            <Image
              src="/img/landing/hero/hero.png"
              alt={name}
              h={550}
              display={{ base: 'none', lg: 'block' }}
            />
          </GridItem>
        </Grid>
      </BoxContainer>
    </Flex>
  )
}