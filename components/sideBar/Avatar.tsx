import Image from "next/image";
import { useRouter } from "next/router";

interface AvatarProps {
  userId?: string;
  isLarge?: boolean;
  hasborder?: boolean;
  profileImage?: string;
}
const Avatar: React.FC<AvatarProps> = ({
  hasborder,
  isLarge,
  userId,
  profileImage,
}) => {
  let router = useRouter();
  const onClick = (e: any) => {
    e.stopPropagation();
    router.push(`/users/${userId}`);
  };
  return (
    <div
      className={`
    ${hasborder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full 
    hover:opacity-90 
    transition 
    cursor-pointer
    relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={profileImage || "/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
