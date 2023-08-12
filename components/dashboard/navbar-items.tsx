import { UserButton } from "@clerk/nextjs";
import { routes } from "@/lib/constants";

const NavbarItems = () => {
  return (
    <>
      <span className="text-4xl font-bold text-brand-dark">Dashboard</span>
      <UserButton afterSignOutUrl={routes.signin.pathname} />
    </>
  );
};

export default NavbarItems;
