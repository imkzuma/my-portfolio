import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function BoxContainer({ children, ...rest }: { children: ReactNode }) {
  return (
    <Box
      w={'full'}
      px={{ base: 7, lg: '10rem' }}
      {...rest}
    >
      {children}
    </Box>
  )
}


export function DashboardContainer({ children, ...rest }: { children: ReactNode }) {
  return (
    <Box
      w={'full'}
      px={{ base: 7, md: 14 }}
      minH={'100vh'}
      bg={useColorModeValue('#eeeeee', 'gray.900')}
    >
      {children}
    </Box>
  )
}
