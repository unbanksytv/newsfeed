import { onClose } from "@/slices/editModal";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./sideBar/input";
import Modal from "./sideBar/modal";
import {
  useCheckCurrentUserQuery,
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
} from "@/slices/apiSlices/apiSlice1";
import { signIn } from "next-auth/react";
import ImageUpload from "./imageupload";

const EditModal = () => {
  let dispatch = useDispatch();

  let editModalstate = useSelector((state: RootState) => state.edit.isOpen);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    isLoading: fetchingData,
    refetch,
  } = useCheckCurrentUserQuery({});
  const [updateFn] = useUpdateUserProfileMutation({});
  useEffect(() => {
    setName(data?.name);
    setUsername(data?.username);
    setBio(data?.bio);
    setProfileImage(data?.profileImgage);
    setCoverImage(data?.coverImage);
  }, [data]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      updateFn({ name, username, bio, profileImage, coverImage, id: data?.id });
      refetch();
      dispatch(onClose());
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        label="Upload Profile Image"
        onChange={(image) => setProfileImage(image)}
        disabled={isLoading}
        value={profileImage}
      />
      <ImageUpload
        label="Upload Cover Image"
        onChange={(image) => setCoverImage(image)}
        disabled={isLoading}
        value={coverImage}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModalstate}
      title="Edit Profile"
      actionLabel="Update"
      onClose={() => dispatch(onClose())}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
