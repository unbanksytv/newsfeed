import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineMessage,
} from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../sideBar/Avatar";
import {
  useCheckCurrentUserQuery,
  useLikePostMutation,
  useUnLikePostMutation,
} from "@/slices/apiSlices/apiSlice1";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const { data: currentUser } = useCheckCurrentUserQuery({});
  const [like] = useLikePostMutation();
  const [unlike] = useUnLikePostMutation();

  const likePost = async () => {
    try {
      if (!data?.likesIds.includes(currentUser?.id)) {
        await like({ currentUser: currentUser?.id, postId: data?.id });
      } else {
        await unlike({ currentUser: currentUser?.id, postId: data?.id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} profileImage={data?.user.profileImgage} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              onClick={likePost}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            "
            >
              {!data?.likesIds.includes(currentUser?.id) ? (
                <AiOutlineHeart size={20} />
              ) : (
                <AiFillHeart size={20} />
              )}
              <p>{data?.likesIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
