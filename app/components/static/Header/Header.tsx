import Currency from "../../dynamic/Currency";

import ShoppingCart from "../../dynamic/ShoppingCart/ShoppingCart";
import Notifications from "../../dynamic/Notifications/Notifications";
import UserMenu from "../../dynamic/UserMenu";
import Search from "../../dynamic/Header/Search";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import BurgerMenu from "../../dynamic/Header/BurgerMenu";
import DropDownNav from "../../dynamic/DropDownNav";



const Header = async () => {
  const session = await getServerSession(options)

  return (
    <header className="relative">
      <nav className="px-10 z-50 h-[4rem] dark:text-text text-contrast bg-black/50 flex justify-between items-center fixed w-full backdrop-blur-sm">

        <DropDownNav buttonTitle="Eventzor" items={[{ href: "/", label: "home" }, { href: "/events", label: "events" }, { href: "/market", label: "market" }, { href: "/users", label: "users" },{href: '/dashboard', label: "dashboard"}]} />


        <div className="gap-4 items-center pr-8 md:flex hidden">
          <Search minimizeOnLg />
          <Currency />
          <UserMenu />
        </div>
        <div className="flex mr-8 gap-4">
          <ShoppingCart />
          <BurgerMenu />
          {session?.user?.name ? < Notifications /> : <></>}
        </div>

      </nav>
    </header>
  );
};

export default Header;
