import { OfficialApi } from "@/utils/api";
import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface DeleteBlogBySlugProps {
  cancelRef: any;
  isOpen: boolean;
  onClose: () => void;
  slug: string;
}

export const DeleteBlogBySlug = ({ cancelRef, isOpen, onClose, slug }: DeleteBlogBySlugProps) => {
  const router = useRouter();
  const Toast = useToast();

  const handleDeleteBlog = async (e: any) => {
    e.preventDefault();

    try {
      const encodedSlug = encodeURIComponent(slug);
      const response = await OfficialApi.delete(`/post/${encodedSlug}`);
      if (response.status === 200) {
        onClose();
        return Swal.fire({
          title: 'Success!',
          text: 'Your blog has been deleted.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          router.reload();
        });
      }
    } catch (error) {
      Toast.closeAll();
      return Toast({
        position: "top",
        title: "Failed!",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            Delete Blog
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure want to delete this blog?
          </AlertDialogBody>
          <AlertDialogFooter gap={4}>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteBlog}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}