export default function useAuth() {
  if (typeof window === "undefined") {
    return null;
  }
  const token = localStorage.getItem("auth-token");

  if (token) {
    return true;
  }
  return false;
}