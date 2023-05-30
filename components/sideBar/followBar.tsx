import { useGetAlluserQuery } from "@/slices/apiSlices/apiSlice1";
import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";

const FollowBar = () => {
  const { data = [] } = useGetAlluserQuery({});
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {data?.map((x: Record<string, any>) => (
            <div className="flex flex-row items-center gap-4" key={x.id}>
              <div className="rounded-full bg-slate-700 w-12 h-12">
                <Avatar userId={x.id} profileImage={x.profileImgage} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm font-semibold">
                  {x.username}
                </h2>
                <p className="text-neutral-500 text-sm">@{x.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
