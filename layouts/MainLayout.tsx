import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { useLayoutEffect, useState } from "react";

export default function MainLayout({ children, username }: { children: ReactNode, username: string }) {
  const [display, setDisplay] = useState<string>('none');

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setDisplay('block');
      } else {
        setDisplay('none');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  return (
    <>
      <Navbar username={username} />
      {children}
      <Footer />
      <Box pos={'fixed'} bottom={5} right={5} zIndex={999}>
        <Button
          py={3}
          w={'fit-content'} h={'fit-content'}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          display={display}
          bg={useColorModeValue('gray.300', 'gray.700')}
          _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}

        >
          <ChevronUpIcon fontSize={'3xl'} />
        </Button>
      </Box>
    </>
  )
}