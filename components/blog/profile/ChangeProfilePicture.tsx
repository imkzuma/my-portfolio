import { useRouter } from "next/router";
import { useState } from 'react';
import { OfficialApi } from "@/utils/api";
import { Button, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import FormData from "form-data";

const ChangeProfilePicture = ({ username, setUrl }: { username: string, setUrl: any }) => {
  const router = useRouter();
  const Toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>();

  const handleImageChange = (e: any) => {
    if (e.target.files[0].size > 2 * 1024 * 1024) {
      return Toast({
        position: 'top',
        title: "Failed",
        description: "Image size must be under 2Mb",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    else {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
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
      const { response } = error as any;
      if (response.status === 400) {
        return Toast({
          position: 'top',
          title: "Failed",
          description: "Image size must be under 2Mb",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={5}>
      <Text color={'red.400'}>* Gambar maksimal 2MB</Text>
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

export default ChangeProfilePicture;