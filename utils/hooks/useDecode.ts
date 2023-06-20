import jwt_decode from 'jwt-decode';

export default function useDecode() {
  if (typeof window === "undefined") {
    return null;
  }
  const token = localStorage.getItem("auth-token");

  const decoded = jwt_decode()
  return decoded;
}