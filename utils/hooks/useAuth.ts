export default function useAuth() {
  if (typeof window === "undefined") {
    return null;
  }
  const user = localStorage.getItem("@portfolio/user");
  const token = user ? JSON.parse(user).token : null;

  if (token) {
    return true;
  }
  return false;
}