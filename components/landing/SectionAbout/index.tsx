import { Box, Flex, Grid, GridItem, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function SectionAbout(){
    return(
        <Flex alignItems={'center'} justifyContent={'center'} w = {'full'} minH = {'50vh'} bg = {useColorModeValue('white', 'gray.900')}>
            <Box w = "full" px={{ base: 5, lg: '10rem' }}>
                <Grid
                    gridTemplateColumns={'repeat(12, 1fr)'}
                    gap = {5}
                >
                    <GridItem
                        gridColumn={{
                            base: 'span 12',
                            lg: 'span 4'
                        }}
                    >
                        <Stack
                            direction = {'column'}
                        >
                            <Text>
                                <Text as = 'span' color = {useColorModeValue('blue.400', 'blue.500')}>/</Text>
                                ABOUT ME
                            </Text>
                            <Text fontSize={'32px'} fontWeight={'semibold'}>
                                I&apos;ve been developing websites since 2021
                            </Text>
                            <Text color = {useColorModeValue('gray.600', 'gray.400')} lineHeight={1.8}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, doloribus doloremque, odit, quisquam explicabo eos quasi laboriosam modi quam in et dolores? Accusamus fugit cum praesentium asperiores facere aspernatur enim.
                            </Text>
                        </Stack>
                    </GridItem>
                    <GridItem gridColumn={{lg: 'span 2'}}>
                        <Spacer />
                    </GridItem>
                    <GridItem
                        gridColumn={{
                            base: 'span 12',
                            lg: 'span 6'
                        }}
                    >
                        s
                    </GridItem>
                </Grid>
            </Box>
        </Flex>
    )
}