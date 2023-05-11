import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function MainLayout({ children } : { children: ReactNode }){
    return(
        <>
            <Navbar />
            { children }
        </>
    )
}