import { useGetAllPostQuery } from "@/slices/apiSlices/apiSlice1";
import PostItem from "./postItem";
import { ClipLoader } from "react-spinners";
interface PostFeed {
  myPost?: boolean;
  userId?: string;
}
const PostFeed: React.FC<PostFeed> = ({ myPost, userId }) => {
  let url = myPost ? `api/post?userId=${userId}` : "api/post";
  const { data: posts, isLoading } = useGetAllPostQuery({ url });
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <div>
      {posts?.map((post: Record<string, any>, index: number) => (
        <div key={index}>
          <PostItem data={post} />
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
