import { Avatar, AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import { Icons } from "./Icons";
import { AvatarFallback } from "./ui/Avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
  imageClass?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  console.log(user, "user");
  const { imageClass } = props;
  return (
    <Avatar {...props}>
      {user.image ? (
        <div
          className={cn(
            "relative h-full w-full rounded-full overflow-hidden ",
            imageClass
          )}
        >
          <Image
            fill
            src={user.image}
            alt={"profile picture"}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback className={imageClass}>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
