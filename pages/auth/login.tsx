import FormLogin from "@/components/auth/login/FormLogin";
import AuthLayout from "@/layouts/AuthLayout";
import useAuth from "@/utils/hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default function LoginPage() {
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
        <title>Portfolio | Login Page</title>
      </Head>
      <AuthLayout>
        <FormLogin />
      </AuthLayout>
    </>
  )
}