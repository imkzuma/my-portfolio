import { useEffect, useState } from "react"
import { OfficialApi } from "../api";

export const useProfile = (username: string) => {
  const [profile, setProfile] = useState<any>();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await OfficialApi.get(`/profile/${username}`);
        const { data } = response;
        if (response.status === 200) {
          setProfile(data.data);
        }
      } catch (error) {
        //console.log(error);
      }
    }
    getProfile();
  }, [username]);

  return profile;
}