import { onClose } from "@/slices/loginModal";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./sideBar/input";
import Modal from "./sideBar/modal";
import { onOpen } from "@/slices/registerModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  let dispatch = useDispatch();
  let loginModalState = useSelector((state: RootState) => state.login.isOpen);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const user = await signIn("credentials", { email, password });
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
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mb-6 flex items-center justify-center">
      <p> First time using twitter ? </p>
      <span
        className="text-white cursor-pointer hover:underline pl-2"
        onClick={handleToggle}
      >
        Create an account
      </span>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModalState}
      title="Login"
      actionLabel="Sign in"
      onClose={() => dispatch(onClose())}
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
