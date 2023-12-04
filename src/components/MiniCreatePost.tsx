"use client";
import { ImageIcon, Link2 } from "lucide-react";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-6 ">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name,
              image: session?.user.image,
            }}
            imageClass="w-10 h-10"
          />
          <span className="absolute bottom-[3px] right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>
        <Input
          readOnly
          onClick={() => router.push(pathName + "/submit")}
          placeholder="Create Post"
        />
        <Button
          onClick={() => router.push(pathName + "/submit")}
          variant="ghost"
        >
          <ImageIcon className="text-zinc-600" />
        </Button>

        <Button
          onClick={() => router.push(pathName + "/submit")}
          variant="ghost"
        >
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </div>
  );
};

export default MiniCreatePost;
