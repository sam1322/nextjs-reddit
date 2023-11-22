"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { X } from "lucide-react";
interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter();
  return (
    <Button
      variant={"subtle"}
      className="h-6 w-6 p-0 rounded-md"
      aria-label="close model"
      onClick={() => router.back()}
      // onClick={() => router.push("/")}
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
