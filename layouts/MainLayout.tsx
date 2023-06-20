import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout({ children, username }: { children: ReactNode, username: string }) {
  return (
    <>
      <Navbar username={username} />
      {children}
      <Footer />
    </>
  )
}