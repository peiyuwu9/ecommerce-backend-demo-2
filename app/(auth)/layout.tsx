import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex h-full items-center justify-center">
        {children}
      </div>
    );
  }