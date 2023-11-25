"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
        await signIn("google");
        // throw new Error("Something went wrong")
    } catch (error) {
      console.error(error);
      //   toast notification
      toast({
        title: "There was a problem",
        description: "There was an error logging in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full font-semibold "
      >
        {isLoading ? null : <Icons.google className="h-5 w-5 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
