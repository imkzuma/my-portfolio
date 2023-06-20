import { Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ParagraphPrimary = ({ children, ...rest }: any) => {
  return (
    <Text
      lineHeight={1.8}
      fontSize={{ base: '16px' }}
      {...rest}
    >
      {children}
    </Text>
  )
}

export const ParagraphSecondary = ({ children, ...rest }: any) => {
  return (
    <Text
      lineHeight={1.8}
      fontSize={{ base: '16px' }}
      color={useColorModeValue('gray.500', 'gray.400')}
      {...rest}
    >
      {children}
    </Text>
  )
}