import InputEmail from "@/components/forms/InputEmail";
import InputPassword from "@/components/forms/InputPassword";
import InputText from "@/components/forms/InputText";
import { OfficialApi } from "@/utils/api";
import { Button, FormErrorMessage, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

interface LoginProps {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export default function FormRegister() {
  const router = useRouter();
  const Toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errorMatched, setErrorMatched] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      return Toast({
        position: "top",
        title: "Register Failed",
        description: "Password not matched!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    else {
      try {
        setLoading(true);
        Toast.closeAll();

        const response = await OfficialApi.post('/account/signup', {
          username: username,
          email: email,
          password: password,
          password_repeat: passwordConfirmation
        });

        if (response.status === 201) {
          Swal.fire({
            title: 'Register Success',
            text: 'Register success, please login to continue',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/auth/login')
            }
          });
        }
      } catch (error) {
        const { response } = error as any;

        if (response.status === 400) {
          return Toast({
            position: "top",
            title: "Register Failed",
            description: "Username not valid!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }

        if (response.status === 409) {
          return Toast({
            position: "top",
            title: "Register Failed",
            description: "Username or email already taken!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }

      } finally {
        setLoading(false);
      }
    }
  }

  const isDisabled = () => {
    return (
      email === '' || username === '' || password === ''
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={7}>
          <InputText title={"Username"} text={username} setText={setUsername} />
          <InputEmail email={email} setEmail={setEmail} />
          <InputPassword password={password} setPassword={setPassword} />
          <InputPassword title="Re-type Password" password={passwordConfirmation} setPassword={setPasswordConfirmation} />

          <Button
            type="submit"
            bg={useColorModeValue('blue.500', 'blue.600')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('blue.600', 'blue.700'),
            }}
            h={'fit-content'}
            py={4}
            rounded={'xl'}
            isDisabled={isDisabled()}
            isLoading={loading}
          >
            Register
          </Button>
        </Stack>
      </form>
    </>
  )
}