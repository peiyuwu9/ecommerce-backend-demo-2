import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shucha Ecommerce",
  description: "Shucha Ecommerce",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p>Layout</p>
      <div className="flex h-full items-center justify-center">{children}</div>
    </>
  );
}
