import { HeadingText } from "@/components/typography/Heading";
import { ParagraphSecondary } from "@/components/typography/Paragraph";
import { HeadingSpan } from "@/components/typography/headingSpan";
import { Box, Button, Divider, Flex, Grid, GridItem, Icon, Image, Spacer, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsLinkedin, BsGithub, BsInstagram, BsChevronDown } from "react-icons/bs";

interface SocialMediaInterface {
  id: number;
  name: string;
  href: string;
  icon: any;
};

const SocialMedia = [
  { id: 1, name: 'LinkedIn', href: 'https://www.linkedin.com/in/gung-krisna/', icon: BsLinkedin },
  { id: 2, name: 'Github', href: 'https://www.github.com/imkzuma', icon: BsGithub },
  { id: 3, name: 'Instagram', href: 'https://www.instagram.com/_gungkrsn/', icon: BsInstagram },
] as SocialMediaInterface[];

export default function HeroLandingPage({ data, username }: any) {
  return (
    <Flex
      minH={'90vh'}
      minW={"full"}
      alignItems={'center'}
      justifyContent={'center'}
      pos={'relative'}
      py={{ base: 10, lg: 0 }}
      overflow={'hidden'}
    >
      <Box
        bgImage={'url(/img/lingkaran.png)'}
        bgSize={'contain'}
        bgRepeat={'no-repeat'}
        pos={'absolute'}
        h={'869px'} w={'869px'}
        bottom={0}
      />

      <Stack minW={'full'} spacing={{ base: 5, lg: 5 }}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            as={motion.img}
            src={data?.image ? data?.image : '/img/landing/hero/hero.png'}
            pos={{ lg: 'absolute' }} bottom={0}
            alt='hero'
            objectFit={'cover'}
            zIndex={-1}
            w={{ base: "80%", lg: '32%' }}
            display={{ base: 'flex', lg: 'none' }}
            filter={useColorModeValue('brightness(0.9)', 'brightness(0.75)')}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 0.5
              }
            }}
            initial={{
              opacity: 0,
            }}
          />
        </Flex>

        <Grid
          gridTemplateColumns={'repeat(12, 1fr)'}
          alignItems={'center'}
          gap={{ base: 4, lg: 8 }}
        >
          <GridItem
            colSpan={{ base: 12, lg: 5 }}
          >
            <Stack direction={'column'} gap={4}>
              <HeadingSpan title="PROFILE" />
              <HeadingText>
                I&apos;m <u>{data?.name ? data.name : username}</u>, a {data?.position}
                {data?.education ? ` at ${data?.education}` : ""}
              </HeadingText>
              <ParagraphSecondary>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque modi harum voluptate expedita,
                vel ducimus dolorum doloremque sit vero omnis eos aspernatur consequatur dolore et eum eligendi
                velit deserunt nisi?
              </ParagraphSecondary>
              <Button
                w={'fit-content'}
                color={'white'}
                bg={useColorModeValue('blue.400', 'blue.600')}
                _hover={{
                  bg: useColorModeValue('blue.500', 'blue.700')
                }}
              >
                Read More
              </Button>
            </Stack>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 4 }} maxH={'90vh'}>
            <Image
              as={motion.img}
              whileInView={{
                opacity: 1,
                transition: {
                  duration: 0.5
                }
              }}
              initial={{
                opacity: 0,
              }}
              src={data?.image ? data?.image : '/img/landing/hero/hero.png'}
              alt='hero'
              objectFit={'contain'}
              w={'full'} maxH={'90vh'}
              filter={useColorModeValue('brightness(0.9)', 'brightness(0.75)')}
              display={{ base: 'none', lg: 'block' }}
            />
          </GridItem>

          <GridItem
            colSpan={{ base: 12, lg: 3 }}
          >
            <Stack direction={'column'} spacing={7}>
              <Divider display={{ lg: 'none' }} />
              <Stack
                direction={'column'}
                spacing={4}
              >
                <Text fontWeight={'semibold'} fontSize={'24px'}>
                  ABOUT ME
                </Text>
                <ParagraphSecondary>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, a qui. Aperiam dolorum
                  nobis incidunt. Porro veritatis, aliquam consequuntur officiis tempora ipsa, assumenda facere
                  accusamus maxime necessitatibus libero dolorum. A?
                </ParagraphSecondary>
              </Stack>
              <Divider />
              <Stack direction={'column'} spacing={4}>
                <Text fontWeight={'semibold'} fontSize={'24px'}>
                  FOLLOW ME
                </Text>
                <Flex gap={3}>
                  {SocialMedia.map((item) => {
                    return (
                      <Button key={item.id}
                        as={'a'}
                        href={item.href}
                        variant={'outline'}
                        p={0}
                        size={'lg'}
                      >
                        <Icon as={item.icon} fontSize={'xl'} />
                      </Button>
                    )
                  })}
                </Flex>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </Flex>
  )
}