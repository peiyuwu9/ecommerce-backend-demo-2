"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname();
  const routes = [
    {
      name: "Overview",
      pathname: "/dashboard/overview",
    },
    {
      name: "Products",
      pathname: "/dashboard/products",
    },
  ];

  return (
    <div className="inline-block bg-brand_bright px-2 py-3 mx-8 my-4 rounded-[12px]">
      {routes.map((route) => (
        <Link
          key={route.name}
          href={route.pathname}
          className={` ${
            pathname === route.pathname
              ? "inline-block px-2 py-1 mx-1 rounded-[10px] bg-brand_background scale-110 transition"
              : "inline-block px-2 py-1 mx-1 rounded-[10px]"
          }`}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
