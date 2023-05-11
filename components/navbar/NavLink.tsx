import { Link, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function NavLink({href, isActive, children } : {href : string, isActive ?: boolean, children : ReactNode}){
    return (
        <Link
            px={2} py={2}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue(!isActive? 'gray.100' : 'gray.200', !isActive?'gray.800' : 'gray.700'),
            }}
            bg = {useColorModeValue(isActive ? 'gray.200' : 'none', isActive ? 'gray.700' : 'none')}
            color = {useColorModeValue(isActive? 'blue.400':'gray.700', isActive ? 'blue.400':'gray.400')}
            fontWeight={'semibold'}
            href={href}
        >
            {children}
        </Link>
    )
}