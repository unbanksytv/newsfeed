import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SideBarLogo from "./sideBarLogo";
import SideBarItem from "./sideBarItem";
import SideBarTweetBtn from "./sideBarTweetBtn";
import { useCheckCurrentUserQuery } from "@/slices/apiSlices/apiSlice1";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { onOpen } from "@/slices/loginModal";

const SideBar = () => {
  const { data: currentUser } = useCheckCurrentUserQuery({});
  let dispatch = useDispatch();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    // {
    //   label: "Notification",
    //   href: "/notification",
    //   icon: BsBellFill,
    //   auth: true,
    // },

    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {items.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SideBarItem
              label="Logout"
              icon={BiLogOut}
              onClick={() => signOut()}
            />
          )}
          <SideBarTweetBtn />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
