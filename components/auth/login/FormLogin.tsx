import InputEmail from "@/components/forms/InputEmail";
import InputPassword from "@/components/forms/InputPassword";
import { OfficialApi } from "@/utils/api";
import { Button, Heading, Input, Modal, ModalBody, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

interface LoginProps {
  email: string;
  password: string;
}

export default function FormLogin() {
  const router = useRouter();
  const Toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await OfficialApi.post('/account/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        localStorage.setItem('auth-token', response.headers.authorization);
        localStorage.setItem('auth-username', response.data.data.username)
        router.replace('/dashboard/');
      }

    } catch (error) {
      setLoading(false);
      Toast({
        title: 'Error',
        description: 'Username or password is incorrect',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = () => {
    return email === '' || password === '';
  }

  const bgButton = useColorModeValue('blue.500', 'blue.600');
  const bgButtonHover = useColorModeValue('blue.600', 'blue.700');

  return (
    <Stack spacing={10}>
      <Heading
        textAlign={{ md: 'center' }}
      >
        Login Page
      </Heading>

      <form onSubmit={handleSubmit}>
        <Stack spacing={7}>
          <InputEmail email={email} setEmail={setEmail} />
          <InputPassword title="Password" password={password} setPassword={setPassword} />
          <Button
            type="submit"
            bg={bgButton}
            color={'white'}
            _hover={{
              bg: bgButtonHover,
            }}
            h={'fit-content'}
            py={4}
            rounded={'xl'}
            isDisabled={isDisabled()}
            isLoading={loading}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}