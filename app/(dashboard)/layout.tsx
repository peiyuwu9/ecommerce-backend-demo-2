import type { Metadata } from "next";

import Navbar from "@/components/dashboard/navbar";
import NavbarItems from "@/components/dashboard/navbar-items";
import Tabs from "@/components/dashboard/tabs";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar>
        <NavbarItems />
      </Navbar>
      <Tabs />
      <main className="mx-8 my-2 px-6 py-4 h-auto bg-white rounded-lg drop-shadow-xl">
        {children}
      </main>
    </>
  );
}
