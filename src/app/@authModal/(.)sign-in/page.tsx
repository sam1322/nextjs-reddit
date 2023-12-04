"use client";
import CloseModal from "@/components/CloseModal";
import SignIn from "@/components/SignIn";
import { FC } from "react";
import { useRouter } from "next/navigation";

const Page: FC = () => {
  const router = useRouter();
  return (
    <div
      className="fixed inset-0 bg-zinc-900/20 z-10"
      onClick={() => router.back()}
      // onClick={() => router.push("/")}
    >
      <div
        className="container flex items-center h-full max-w-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Page;
