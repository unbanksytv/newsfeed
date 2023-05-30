import Header from "@/components/sideBar/header";
import React from "react";
import { useRouter } from "next/router";
import { useFetchUserDetailsQuery } from "@/slices/apiSlices/apiSlice1";
import { ClipLoader } from "react-spinners";
import Userprofile from "@/components/user/Userprofile";
import UserBio from "@/components/user/userBio";
import PostFeed from "@/components/post/postFeed";

const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, isLoading } = useFetchUserDetailsQuery(userId as String);
  console.log(data);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  return (
    <div>
      <Header ShowBackArrow label={data?.username} />
      <Userprofile
        coverImage={data?.coverImage}
        profileImage={data?.profileImgage}
      />
      <UserBio
        userId={userId as string}
        name={data?.name}
        username={data?.username}
        bio={data?.bio}
        following={data?.followingId?.length}
        followers={data?.followersCount || 0}
        createdAt={data?.createdAt}
      />
      <PostFeed myPost userId={userId as string} />
    </div>
  );
};

export default User;
