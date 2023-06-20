import { Text, useColorModeValue } from "@chakra-ui/react"

export const HeadingSpan = ({ title }: { title: string }) => {
  return (
    <Text>
      <Text as='span' color={useColorModeValue('blue.400', 'blue.500')}>/ </Text>
      {title}
    </Text>
  )
}