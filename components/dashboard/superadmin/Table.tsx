import { useEffect, useState, useRef } from "react";
import { Skeleton, useColorModeValue, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Button, Badge, Flex, Icon, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Select, Stack, useToast, Divider } from "@chakra-ui/react";
import { OfficialApi } from "@/utils/api";
import { ParsedDateTime } from "@/utils/parsingDateTime";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";

const EditUser = ({ isOpen, onClose, ref, username, roles }: any) => {
  const Toast = useToast();
  const [role, setRole] = useState<number>(roles as number);

  const handleRoleSelect = (e: any) => {
    setRole(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      if (roles === role || role === undefined) {
        onClose();
        return Toast({
          title: "Success",
          description: "Role changed successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
      else {
        const response = await OfficialApi.patch(`/super/account/${username}`, {
          role: role
        });
        if (response.status === 200) {
          onClose();
          Swal.fire({
            title: 'Success',
            text: 'Role changed successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 2000
          }).then(() => {
            window.location.reload();
          })
        }
      }
    } catch (error) {
      //
    }
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={ref}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            Edit User
          </AlertDialogHeader>
          <AlertDialogBody>
            <Stack spacing={4}>
              <Text>
                Assign roles to user <b>{username}</b>
              </Text>
              <Select placeholder="Select Role to assign" onChange={handleRoleSelect}>
                <option value="0">Admin</option>
                <option value="1">Super Admin</option>
              </Select>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter gap={3}>
            <Button variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default function SuperTable() {
  const cancelRef = useRef();

  const [tableData, setTableData] = useState<any>();
  const [loadingTableData, setLoadingTableData] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPage, setCountPage] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getTableData = async () => {
      try {
        setLoadingTableData(true);
        const response = await OfficialApi.get(`/super/account?page=${currentPage}`);
        if (response.status === 200) {
          const { data } = response.data;
          setTableData(data);
          setCountPage(data?.pagination.page_count);
        }
      } catch (error) {
        //console.log(error);
      } finally {
        setLoadingTableData(false);
      }
    }

    getTableData();

  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage >= 1 && countPage && currentPage < countPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const [usernameEdit, setUsernameEdit] = useState<string>('');
  const [roleEdit, setRoleEdit] = useState<number>(0);

  const handleEditUser = (username: string, role: number) => {
    setUsernameEdit(username);
    setRoleEdit(role);
    onOpen();
  }

  const bgTb = useColorModeValue("white", "gray.800");

  return (
    <>
      <EditUser
        isOpen={isOpen}
        onClose={onClose}
        ref={cancelRef}
        username={usernameEdit as string}
        roles={roleEdit as number}
      />
      <Flex align={'center'} gap={3}>
        <Button
          w={'fit-content'}
          rounded={"full"}
          p={0}
          colorScheme="blue"
          size="sm"
        >
          {tableData?.count}
        </Button>
        <Text fontSize={'2xl'} fontWeight={'semibold'}>
          User Accounts
        </Text>
      </Flex>
      <Divider />

      {loadingTableData ? (
        <Skeleton height="400px" />
      ) : (
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="gray"
            bg={bgTb}
            rounded={'md'}
          >
            <Thead>
              <Tr>
                <Td>No</Td>
                <Td>Username</Td>
                <Td>Email</Td>
                <Td>CreatedAt</Td>
                <Td>UpdatedAt</Td>
                <Td>Role</Td>
                <Td>Action</Td>
              </Tr>
            </Thead>
            <Tbody>
              {tableData?.account?.map((item: any, index: number) => {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.username}</Td>
                    <Td>{item.email}</Td>
                    <Td>{ParsedDateTime(item.createdAt)}</Td>
                    <Td>{ParsedDateTime(item.updatedAt)}</Td>
                    <Td>
                      <Badge variant={'solid'} colorScheme={item.role === 1 ? "green" : "yellow"}>
                        {item.role === 1 ? "Super Admin" : "Admin"}
                      </Badge>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size={"sm"}
                        onClick={() => handleEditUser(item.username, item.role)}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Flex justify={'space-between'} align={'center'} py={5}>
        <Text fontSize={'md'} fontWeight={'semibold'}>
          Page {currentPage} of {countPage}
        </Text>
        <Flex align={'center'} gap={3}>
          <Button
            onClick={handlePrevPage}
            colorScheme="blue"
            isDisabled={currentPage <= 1}
          >
            <Icon as={ChevronLeftIcon} fontSize={'xl'} />
          </Button>
          <Button
            onClick={handleNextPage}
            colorScheme="blue"
            isDisabled={currentPage >= countPage}
          >
            <Icon as={ChevronRightIcon} fontSize={'xl'} />
          </Button>
        </Flex>
      </Flex >
    </>
  )
}