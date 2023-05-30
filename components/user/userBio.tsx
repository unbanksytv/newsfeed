import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import Button from "../button";
import {
  useCheckCurrentUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/slices/apiSlices/apiSlice1";
import { useDispatch } from "react-redux";
import { onOpen } from "@/slices/editModal";

interface UserBioProps {
  userId: string;
  name: string;
  username: string;
  bio: string;
  following: number;
  followers: number;
  createdAt: string;
}

const UserBio: React.FC<UserBioProps> = ({
  userId,
  name,
  username,
  bio,
  followers,
  following,
  createdAt,
}) => {
  const { data: currentUser } = useCheckCurrentUserQuery({});
  const dispatch = useDispatch();

  const [follow] = useFollowUserMutation({});
  const [unfollow] = useUnfollowUserMutation({});

  const followUser = async () => {
    try {
      if (!currentUser?.followingId.includes(userId)) {
        await follow({ currentUser: currentUser?.id, userId });
      } else {
        await unfollow({ currentUser: currentUser?.id, userId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createdAtRes = () => {
    if (!createdAt) {
      return null;
    }

    return format(new Date(createdAt), "MMMM yyyy");
  };
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button
            secondary
            label="Edit"
            onClick={() => {
              dispatch(onOpen());
            }}
          />
        ) : (
          <Button
            secondary
            label={
              currentUser?.followingId.includes(userId) ? "Unfollow" : "Follow"
            }
            onClick={followUser}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{name}</p>
          <p className="text-md text-neutral-500">@{username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAtRes()}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{following}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{followers}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
