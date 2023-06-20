import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

export const HeadingText = ({ children }: { children: ReactNode }) => {
  return (
    <Heading fontSize={{ base: '4xl', md: '48px' }}>
      {children}
    </Heading>
  )
}