import { useCallback, useState } from "react";

import Avatar from "./sideBar/Avatar";
import Button from "./button";
import {
  useCheckCurrentUserQuery,
  useCreatePostMutation,
} from "@/slices/apiSlices/apiSlice1";
import { useDispatch } from "react-redux";
import { onOpen as openLogin } from "@/slices/loginModal";
import { onOpen as opneReg } from "@/slices/registerModal";
import { ClipLoader } from "react-spinners";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  let dispath = useDispatch();
  const { data: currentUser, isLoading: currentUserLoading } =
    useCheckCurrentUserQuery({});
  const [createPost] = useCreatePostMutation();
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await createPost({ body, userId: currentUser?.id });

      setBody("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (currentUserLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar
              userId={currentUser?.id}
              profileImage={currentUser?.profileImgage}
            />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disable={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={() => dispath(openLogin())} />
            <Button
              label="Register"
              onClick={() => dispath(opneReg())}
              secondary
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
