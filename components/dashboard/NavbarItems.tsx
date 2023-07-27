import { UserButton } from "@clerk/nextjs";

const NavbarItems = () => {
  return (
    <>
      <span className="text-5xl">Dashboard</span>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default NavbarItems;
