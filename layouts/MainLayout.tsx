import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}