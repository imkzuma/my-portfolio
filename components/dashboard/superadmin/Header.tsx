import StatComponent from '@/components/stat'
import { Divider, Flex, Stack, Text } from '@chakra-ui/react'

export default function HeaderDashboardSuper({ data }: { data: any }) {
  return (
    <>
      <Stack spacing={5}>
        <Text fontSize={'2xl'} fontWeight={'semibold'}>
          Dashboard
        </Text>
        <Divider />
        <Flex
          wrap={{ base: 'wrap', md: 'nowrap' }}
          gap={5}
        >
          <StatComponent label="Account" value={data?.account} />
          <StatComponent label="Thread Create" value={data?.thread} />
          <StatComponent label="Post Create" value={data?.post} />
        </Flex>
      </Stack>
    </>
  )
}