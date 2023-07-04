import { Flex, Stack, Tag, Text } from "@chakra-ui/react";
import TreeComment from '@/components/forum/TreeComment';

export default function ViewComment({ data, usernameComment, ...rest }: any) {
  return (
    <Stack spacing={4} {...rest}>
      {data === null
        ? (
          <Text
            color={'gray.500'}
            textAlign={'center'}
          >
            Belum ada komentar
          </Text>
        )
        : (
          <>
            <Text as={Flex} gap={2}>
              <Tag
                rounded={'full'}
                bg={'blue.500'}
                color={'white'}
                textAlign={'center'}
              >
                {data?.length}
              </Tag>
              Comments
            </Text>
            {data?.map((item: any, index: number) => {
              return (
                <TreeComment key={index}
                  username={item.username}
                  parentId={item.parentId}
                  id={item.id}
                  content={item.content}
                  createdAt={item.createdAt}
                  usernameComment={usernameComment}
                />
              )
            })}
          </>
        )
      }

    </Stack>
  )
}