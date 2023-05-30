import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: String;
  ShowBackArrow?: Boolean;
}

const Header: React.FC<HeaderProps> = ({ label, ShowBackArrow }) => {
  let router = useRouter();
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {ShowBackArrow && (
          <BiArrowBack
            onClick={() => router.back()}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
