import { Avatar, AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import { Icons } from "./Icons";
import { AvatarFallback } from "./ui/Avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  console.log(user,"user");
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative h-6 w-6 rounded-full overflow-hidden ">
          <Image
            fill
            src={user.image}
            alt={"profile picture"}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
