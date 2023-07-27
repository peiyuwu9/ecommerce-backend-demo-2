import type { Metadata } from "next";

import Navbar from "@/components/dashboard/Navbar";
import NavbarItems from "@/components/dashboard/NavbarItems";
import Tabs from "@/components/dashboard/Tabs";

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
      <div className="flex h-full items-center justify-center">{children}</div>
    </>
  );
}
