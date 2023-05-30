import { useCheckCurrentUserQuery } from "@/slices/apiSlices/apiSlice1";
import { onOpen } from "@/slices/loginModal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IconType } from "react-icons";
import { createDispatchHook, useDispatch } from "react-redux";
import { URL } from "url";
interface SideBarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  href,
  label,
  icon: Icon,
  onClick,
  auth,
}) => {
  let { data: currentUser } = useCheckCurrentUserQuery({});
  let dispatch = useDispatch();
  let route = useRouter();

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
    if (auth && !currentUser) {
      dispatch(onOpen());
    } else if (href) {
      route.push(href);
    }
  };
  return (
    <div className="flex flex-row items-center">
      <div
        onClick={() => handleClick()}
        className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
      >
        <Icon size={28} color="white " />
      </div>
      <div
        onClick={() => handleClick()}
        className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer"
      >
        <Icon size={28} color="white " />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SideBarItem;
