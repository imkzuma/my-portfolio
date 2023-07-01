import { ProfilePageProps } from "@/utils/interface/Profile";
import { Avatar, Flex, FormControl, FormLabel, Grid, GridItem, Skeleton, Stack, useColorModeValue, Input, Text } from "@chakra-ui/react";

const ProfileTab = ({ data }: { data: ProfilePageProps }) => {
  const textColors = useColorModeValue('gray.600', 'gray.500');

  if (!data) {
    return (
      <Stack spacing={5}>
        <Skeleton height={'50px'} />
        <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={5} display={{ base: 'block', md: 'grid' }}>
          <Skeleton height={'50px'} />
          <Skeleton height={'50px'} />
          <Skeleton height={'50px'} />
        </Grid>
        <Skeleton height={'50px'} />
      </Stack>
    )
  }

  const { name, education, position, grade, address, wa, instagram, about } = data;

  return (
    <Stack spacing={5}>
      <Flex justify={'center'} display={{ base: 'flex', md: 'none' }}>
        <Avatar
          size={{
            base: 'xl',
            lg: '2xl'
          }}
          name={name}
        />
      </Flex>
      <FormControl>
        <FormLabel>Nama</FormLabel>
        <Input type={'text'} value={name ? name : ''} disabled isDisabled />
      </FormControl>
      <Grid
        gridTemplateColumns={'repeat(3, 1fr)'}
        gap={5}
      >
        <GridItem
          colSpan={{
            base: 3,
            md: 1
          }}
        >
          <FormControl>
            <FormLabel>Education</FormLabel>
            <Input type={'text'} value={education ? education : ''} disabled isDisabled />
          </FormControl>
        </GridItem>
        <GridItem
          colSpan={{
            base: 3,
            md: 1
          }}
        >
          <FormControl>
            <FormLabel>Position</FormLabel>
            <Input type={'text'} value={position ? position : ''} disabled isDisabled />
          </FormControl>
        </GridItem>
        <GridItem
          colSpan={{
            base: 3,
            md: 1
          }}
        >
          <FormControl>
            <FormLabel>Grade</FormLabel>
            <Input type={'text'} value={grade ? grade : ''} disabled isDisabled />
          </FormControl>
        </GridItem>
      </Grid>
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input type={'text'} value={address ? address : ''} disabled isDisabled />
      </FormControl>
      <Grid
        gridTemplateColumns={'repeat(2, 1fr)'}
        gap={5}
      >
        <GridItem
          colSpan={1}
        >
          <FormControl>
            <FormLabel>Whatsapp</FormLabel>
            <Input
              type={'number'}
              value={wa}
              isDisabled
              disabled
            />
          </FormControl>
        </GridItem>
        <GridItem
          colSpan={1}
        >
          <FormControl>
            <FormLabel>Instagram</FormLabel>
            <Input
              type={'text'}
              value={instagram}
              isDisabled
              disabled
            />
          </FormControl>
        </GridItem>
      </Grid>
      <FormControl>
        <FormLabel>About Me</FormLabel>
        <Text color={textColors}>
          {about ? about : ''}
        </Text>
      </FormControl>
    </Stack>
  )
}
export default ProfileTab;