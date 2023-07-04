import { useEffect, useState } from "react"
import { OfficialApi } from "../api";

export const useProfile = (username: string) => {
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        if (username) {
          const response = await OfficialApi.get(`/profile/${username}`);
          const { data } = response;
          if (response.status === 200) {
            setProfile(data.data);
          }
        }
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    getProfile();

  }, [username]);

  return [profile, loading];
}