import { useRouter } from "next/router";
import { useState } from 'react';
import { Button, Flex, Stack, useToast } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { OfficialApi } from "@/utils/api";
import InputPassword from "@/components/forms/InputPassword";
import InputEmail from "@/components/forms/InputEmail";

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

export default ChangePasswordTab;