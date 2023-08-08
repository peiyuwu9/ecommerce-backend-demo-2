import Link from "next/link";
import { routes } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
        <p className="text-5xl font-bold">404</p>
      <p className="text-xl">Sorry, this page does not exist.</p>
      <Link href={routes.overview.pathname} className="text-xl">Back to Home</Link>
    </div>
  );
}
