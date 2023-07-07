import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import useAuth from "@/utils/hooks/useAuth";

export default function DashboardPage() {
  const router = useRouter();
  const isAuth = useAuth();

  useLayoutEffect(() => {
    if (!isAuth) {
      router.replace('/auth/login');
    }
  }, [isAuth, router]);

  return (
    <>
      <DashboardLayout>
        <h1>Dashboard {router.asPath}</h1>
      </DashboardLayout>
    </>
  )
}

// gabung chatbot 
// buat admin buat kontrol data
// buat grafik nampilin apa aja isi content nya
// bnyk user, banyk blog, banyak lainnya.