import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const SectionWithBg = ({ children, bg }: { children: ReactNode, bg: string }) => {
  return (
    <Stack
      pos={'relative'}
      justify={'center'}
      w={'full'}
      bgImage={`url(${bg})`}
      bgSize={'cover'}
      bgRepeat={'no-repeat'}
      minH={'400px'}
      _before={{
        content: '""',
        position: 'absolute',
        w: 'full',
        h: 'full',
        bg: useColorModeValue("#4299E1C4", "#2C5282C5"),
      }}
    >
      <Box pos={'relative'}>
        {children}
      </Box>
    </Stack>
  )
}