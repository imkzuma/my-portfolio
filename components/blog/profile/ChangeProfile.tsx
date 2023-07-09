import { Avatar, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, Stack, Textarea, useToast } from '@chakra-ui/react';
import { useState, useLayoutEffect } from 'react';
import { ProfilePageProps } from '@/utils/interface/Profile';
import { OfficialApi } from '@/utils/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const ChangeProfile = ({ username, data }: { username: string, data: ProfilePageProps }) => {
  const Toast = useToast();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    setName(data.name);
    setEducation(data.education);
    setPosition(data.position);
    setGrade(data.grade);
    setAddress(data.address);
    setWhatsapp(data.wa);
    setInstagram(data.instagram);
    setAbout(data.about);
  }, [data])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await OfficialApi.put(`/profile/${username}`, {
        name: name,
        position: position,
        grade: grade,
        education: education,
        address: address,
        wa: whatsapp,
        instagram: instagram,
        about: about
      });

      if (response.status === 200) {
        return Toast({
          position: 'top',
          title: "Updated",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
    } catch (error) {
      const { response } = error as any;

      if (response.status === 401) {
        localStorage.removeItem('@portfolio/user');
        Swal.fire({
          title: "Oops...",
          text: "Your session is expired, please login again",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false
        }).then(() => {
          router.replace('/auth/login');
        });
      }

      if (response.status === 400) {
        return Toast({
          position: 'top',
          title: "Failed",
          description: response.data.data.errors[0],
          status: "error",
          duration: 3000,
          isClosable: true
        })
      }
    } finally {
      setLoading(false);
    }
  }

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
        <Input
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
            <Input
              type={'text'}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
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
            <Input
              type={'text'}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
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
            <Input
              type={'text'}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </FormControl>
        </GridItem>
      </Grid>
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input
          type={'text'}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
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
              onChange={(e) => setInstagram(e.target.value)}
            />
          </FormControl>
        </GridItem>
      </Grid>
      <FormControl>
        <FormLabel>About Me</FormLabel>
        <Textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </FormControl>
      <Flex
        justify={'end'}
        align={'center'}
      >
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Update Profile
        </Button>
      </Flex>
    </Stack>
  )
}

export default ChangeProfile;