import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, useColorModeValue } from "@chakra-ui/react";

const percentage = (value: number) => {
  let sum = value * 0.1;
  if (sum > 100) {
    sum = 100 * 0.1;
  }
  return Math.round(sum * 100) / 100;
}

export default function StatComponent({ label, value }: { label: string, value: number }) {
  return (
    <StatGroup
      w={{ base: '100%', md: '54%', lg: '33%' }}
      bg={useColorModeValue('white', 'blue.900')}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'blue.800')}
      p={7}
      rounded={"md"}
      pos={'relative'}
    >
      <Stat pos={'relative'}>
        <StatLabel>{label}</StatLabel>
        <StatNumber
          fontSize={{ base: "4xl", lg: "5xl" }}
        >
          {value}
        </StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {percentage(value as number)} %
        </StatHelpText>
      </Stat>
      <Text
        pos={"absolute"}
        right={10}
        top={3}
        fontSize={'8xl'}
        fontWeight={'bold'}
        opacity={0.1}
      >
        {value}
      </Text>
    </StatGroup >
  )
}