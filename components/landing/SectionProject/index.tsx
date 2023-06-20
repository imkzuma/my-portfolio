import { SectionWithBg } from "@/components/bgSection";
import BoxContainer from "@/components/container";
import { Flex, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";

interface dataProps {
  id: number;
  total: number | string;
  description: string;
}

const data = [
  { id: 1, total: 120, description: "Web Apps Developed" },
  { id: 2, total: 23, description: "Mobile Apps Developed" },
  { id: 3, total: 32, description: "Windows Apps Developed" },
  { id: 4, total: "500+", description: "Satisfied Customers" },
] as dataProps[];

export default function SectionProject() {
  return (
    <SectionWithBg bg="/img/footer.png">
      <BoxContainer>
        <Grid
          gridTemplateColumns={'repeat(4, 1fr)'}
          gap={4}
          py={{ base: 10, md: 0 }}
        >
          {data.map((item, index: number) => (
            <GridItem key={index}
              colSpan={{
                base: 2,
                md: 1
              }}
              w={'full'}
              textAlign={{ base: 'start', md: 'center' }}
              color={'white'}
            >
              <Stack>
                <Heading
                  fontSize={{
                    base: '5xl',
                    md: '7xl'
                  }}
                >
                  {item.total}
                </Heading>
                <Text
                  fontSize={{
                    base: 'lg',
                    md: 'xl'
                  }}
                  fontWeight={'light'}
                >
                  {item.description}
                </Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </BoxContainer>
    </SectionWithBg>
  )
}