import { Divider, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LinkParent = ({ path, name }: { path: string, name: string }) => {
  const router = useRouter();
  const activeColor = useColorModeValue('blue.500', 'blue.500');
  const inactiveColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Text as="a"
      href={path}
      w={'fit-content'}
      color={
        router.pathname === path
          ? activeColor
          : inactiveColor
      }
    >
      {name}
    </Text>
  )
}

export default function SidebarNavigation() {
  return (
    <Stack spacing={5}>
      <Text fontWeight={'semibold'} color={useColorModeValue('gray.600', 'gray.400')}>Dashboard</Text>
      <Stack spacing={3}>
        <LinkParent path="/dashboard" name="Home" />
      </Stack>
      <Divider w={'70%'} />
      <Text fontWeight={'semibold'} color={useColorModeValue('gray.600', 'gray.400')}>Blog</Text>
      <Stack spacing={3}>
        <LinkParent path="/dashboard/blog" name="Blog List" />
        <LinkParent path="/dashboard/blog/create" name="Create Blog" />
      </Stack>
      <Divider w={'70%'} />
      <Text fontWeight={'semibold'} color={useColorModeValue('gray.600', 'gray.400')}>Profile</Text>
      <Stack spacing={3}>
        <LinkParent path="/dashboard/profile" name="My Profile" />
      </Stack>
    </Stack >
  )
}