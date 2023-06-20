import InputEmail from "@/components/forms/InputEmail";
import InputPassword from "@/components/forms/InputPassword";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { OfficialApi } from "@/utils/api";
import useAuth from "@/utils/hooks/useAuth";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, Skeleton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import FormData from "form-data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useLayoutEffect } from 'react';
import Swal from "sweetalert2";

interface ProfilePageProps {
  name: string;
  education: string;
  position: string;
  grade: string;
  address: string;
}

const ProfileTab = ({ data }: { data: ProfilePageProps }) => {
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

  const { name, education, position, grade, address } = data;

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
    </Stack>
  )
}

const ChangeProfile = ({ username, data }: { username: string, data: ProfilePageProps }) => {
  const Toast = useToast();

  const [name, setName] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    setName(data.name);
    setEducation(data.education);
    setPosition(data.position);
    setGrade(data.grade);
    setAddress(data.address);
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
        address: address
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
      console.log(error);
      const { response } = error as any;

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

const ChangePasswordTab = ({ username }: { username: string }) => {
  const router = useRouter();
  const Toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isNewPasswordValid = () => {
    if (newPassword !== repeatNewPassword) {
      return false;
    }
    else {
      return true;
    }
  }
  const isDataFilled = () => {
    return email === '' || oldPassword === '' || newPassword === '' || repeatNewPassword === ''
  }

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    Toast.closeAll();

    try {
      setLoading(true);
      const response = await OfficialApi.put(`/account/${username}`, {
        email: email,
        old_password: oldPassword,
        new_password: newPassword,
        new_password_repeat: repeatNewPassword
      });

      if (response.status === 200) {
        setEmail('');
        setNewPassword('');
        setRepeatNewPassword('');
        setOldPassword('');

        Swal.fire({
          title: 'Change Password Succes',
          text: 'Password has been changed',
          icon: "success",
          confirmButtonText: 'OK'
        }).then(() => {
          router.reload();
        })
      }

    } catch (error: any) {
      const { response } = error;
      if (response.status === 403) {
        return Toast({
          position: "top",
          title: "Change Password Failed",
          description: "Invalid email or Old Password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return Toast({
        position: "top",
        title: "Change Password Failed",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={5}>
      <InputEmail
        title="Your Email"
        email={email}
        setEmail={setEmail}
      />
      <InputPassword
        title="Old Password"
        password={oldPassword}
        setPassword={setOldPassword}
      />
      <InputPassword
        title="New Password"
        password={newPassword}
        setPassword={setNewPassword}
      />
      <InputPassword
        title="Repeat New Password"
        password={repeatNewPassword}
        setPassword={setRepeatNewPassword}
      />
      <Flex justify={'end'} align={'center'}>
        <Button
          onClick={handleChangePassword}
          isDisabled={!isNewPasswordValid() || isDataFilled()}
          isLoading={loading}
          colorScheme="blue"
        >
          Update Password
        </Button>
      </Flex>
    </Stack>
  )
}


const ChangeProfilePicture = ({ username, setUrl }: { username: string, setUrl: any }) => {
  const router = useRouter();
  const Toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>();

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!image) {
      return null;
    }

    try {
      setLoading(true);

      let formData = new FormData();
      formData.append('image', image);

      const response = await OfficialApi.put(`/profile/${username}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={5}>
      <Input type="file" onChange={handleImageChange} />
      <Flex justify={'end'}>
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          isDisabled={!image}
          isLoading={loading}
        >
          Update Image
        </Button>
      </Flex>
    </Stack>
  )
}

export default function ProfilePage() {
  const router = useRouter();
  const isAuth = useAuth();
  const [data, setData] = useState<ProfilePageProps | any>();
  const [username, setUsername] = useState<string>('');
  const [urlImage, setUrlImage] = useState<string>('');

  useLayoutEffect(() => {
    if (!isAuth) {
      router.replace('/auth/login');
    }
    const token = localStorage.getItem('auth-username');
    if (token) {
      setUsername(token);
    }

    const getData = async () => {
      try {
        const response = await OfficialApi.get(`/profile/${token}`);
        if (response.status === 200) {
          setData(response.data.data);
          const { image } = response.data.data;
          setUrlImage(image ? image : '');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }, [router, isAuth]);

  return (
    <>
      <Head>
        <title>Dashboard | Profile</title>
      </Head>
      <DashboardLayout>
        <Stack spacing={5} w={'full'}>
          <Flex w={'full'} justify={'space-between'} align={'center'}>
            <ChevronLeftIcon
              fontSize={'3xl'}
              onClick={() => router.push('/dashboard/blog')}
              cursor={'pointer'}
              display={{ base: 'block', lg: 'none' }}
            />
            <Text
              fontWeight={'semibold'}
              fontSize={'lg'}
            >
              Profile
            </Text>
            <ChevronLeftIcon
              color={'transparent'}
              fontSize={'3xl'}
              display={{ base: 'block', lg: 'none' }}
            />
          </Flex>
          <Flex gap={10}>
            <Stack>
              <Avatar
                size={{
                  base: 'xl',
                  lg: '2xl',
                }}
                name={data?.name}
                display={{ base: 'none', md: 'block' }}
                src={urlImage}
              >
                <AvatarBadge boxSize={12} bg='green.500' />
              </Avatar>
            </Stack>

            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              rounded={'xl'}
              minW={{ base: 'full', md: '75%' }}
              w={'fit-content'}
              p={{ base: 3, lg: 7 }}
            >
              <Tabs size={{ base: 'sm', md: 'md' }} isLazy>
                <TabList>
                  <Tab>
                    Profile
                  </Tab>
                  <Tab>
                    Change Profile
                  </Tab>
                  <Tab>
                    Change Profile Picture
                  </Tab>
                  <Tab>
                    Change Password
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <ProfileTab data={data} />
                  </TabPanel>
                  <TabPanel>
                    <ChangeProfile username={username} data={data} />
                  </TabPanel>
                  <TabPanel>
                    <ChangeProfilePicture username={username} setUrl={setUrlImage} />
                  </TabPanel>
                  <TabPanel>
                    <ChangePasswordTab username={username} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Flex>
        </Stack >
      </DashboardLayout >
    </>
  )
}