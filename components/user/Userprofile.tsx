import Image from "next/image";
import Avatar from "../sideBar/Avatar";

interface UserProfileProps {
  coverImage?: string;
  profileImage?: string;
}
const Userprofile: React.FC<UserProfileProps> = ({
  coverImage,
  profileImage,
}) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {coverImage && (
          <Image
            alt="Cover image"
            src={coverImage}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar profileImage={profileImage} isLarge hasborder />
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
