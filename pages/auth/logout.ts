import { useEffect } from "react";
import { OfficialApi } from "@/utils/api";
import { useRouter } from "next/router";
import useAuth from "@/utils/hooks/useAuth";

export default function Logout() {
  const router = useRouter();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth) {
      const logout = async () => {
        try {
          const response = await OfficialApi.post("/account/logout");

          if (response.status === 200) {
            localStorage.removeItem("auth-token");
            localStorage.removeItem("auth-username");
            router.replace("/auth/login");
          }

        } catch (error) {
          console.log(error);
        }
      }
      logout();
    }
    else {
      router.replace('/')
    }
  }, [router, isAuth]);
}