import { onClose } from "@/slices/registerModal";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./sideBar/input";
import Modal from "./sideBar/modal";
import { onOpen } from "@/slices/loginModal";
import { useRegisterUserMutation } from "@/slices/apiSlices/apiSlice1";
import { signIn } from "next-auth/react";

const RegModal = () => {
  let dispatch = useDispatch();
  let loginModalState = useSelector(
    (state: RootState) => state.register.isOpen
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [callSignIn, { data }] = useRegisterUserMutation();
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      await callSignIn({ name, email, password, username });

      signIn("credentials", { email, password });
      dispatch(onClose());
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleToggle = () => {
    dispatch(onClose());
    dispatch(onOpen());
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
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
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mb-6 flex items-center justify-center">
      <p> Already Having account </p>
      <span
        className="text-white cursor-pointer hover:underline pl-2"
        onClick={handleToggle}
      >
        {" "}
        Login
      </span>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModalState}
      title="Create a Account"
      actionLabel="Sign Up"
      onClose={() => dispatch(onClose())}
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegModal;
