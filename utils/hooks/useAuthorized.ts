import { OfficialApi } from "../api"

export default function useAuthorized({ name }: { name: string }) {
  const checkSession = async () => {
    try {
      const response = await OfficialApi.get(`/profile/${name}`);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      const { response } = error as any;
      if (response.status === 401) {
        return false;
      }
    }
  }

  return checkSession;
}