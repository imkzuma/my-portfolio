import CustomBar from "@/components/chart/CustomBar";
import HeaderDashboardSuper from "@/components/dashboard/superadmin/Header";
import SuperTable from "@/components/dashboard/superadmin/Table";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { OfficialApi } from "@/utils/api";
import { Box, Divider, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();

  const [data, setData] = useState<any>();
  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingData(true);
        const response = await OfficialApi.get('/super/detail');
        if (response.status === 200) {
          const { data } = response.data;
          setData(data);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoadingData(false);
      }
    }

    const token = localStorage.getItem("@portfolio/user");
    if (!token) {
      router.replace('/auth/login');
    }

    const { role } = JSON.parse(token!);
    if (role !== 1) {
      router.replace('/dashboard/profile');
    }

    else {
      (async () => {
        try {
          const { username } = JSON.parse(token!);
          const response = await OfficialApi.get(`/profile/${username}`);
          // ini sementara
          // nanti diganti pake role yang ada di database
          // tolong backend nanti lempar role ke frontend
          if (response.data.data.name !== 'Admin Official Site') {
            router.replace('/dashboard/profile');
          }
        } catch (error) {
          // console.log(error);
        }
      })();
    }

    getData();

  }, [router]);

  return (
    <DashboardLayout>
      <Stack spacing={14}>
        {loadingData ? (
          <Flex flexWrap={{ base: "wrap", md: "nowrap" }} gap={5} justifyContent="center">
            <Skeleton height="200px" w={'33%'} />
            <Skeleton height="200px" w={'33%'} />
            <Skeleton height="200px" w={'33%'} />
          </Flex>
        ) : (
          <HeaderDashboardSuper data={data} />
        )}

        {loadingData ? (
          <Box w={{ base: "full" }}>
            <Skeleton height="600px" />
          </Box>
        ) : (
          <Stack spacing={5}>
            <Text fontSize={'2xl'} fontWeight={'semibold'}>
              Website Statistics
            </Text>
            <Divider />
            <Box w={{ base: "full" }}>
              <CustomBar datas={data} />
            </Box>
          </Stack>
        )}

        <Stack>
          <SuperTable />
        </Stack>

      </Stack>
    </DashboardLayout >
  )
}