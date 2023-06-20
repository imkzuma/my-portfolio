import FormRegister from "@/components/auth/register/FormRegister";
import AuthLayout from "@/layouts/AuthLayout";
import useAuth from "@/utils/hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default function RegisterPage() {
  const isAuth = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuth) {
      router.replace('/dashboard');
    }
  }, [isAuth, router]);
  return (
    <>
      <Head>
        <title>Portfolio | Register</title>
      </Head>

      <AuthLayout>
        <FormRegister />
      </AuthLayout>
    </>
  )
}