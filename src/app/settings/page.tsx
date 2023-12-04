export const metadata = {
  title: "Settings",
  description: "Manage account and website settings",
};

import { FC } from "react";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserNameForm from "@/components/UserNameForm";

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session) {
    redirect(authOptions.pages?.signIn || "/sign-in");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-3xl md:text-4xl mb-4">Settings</h1>
      </div>

      <div className="grid gap-10">
        <UserNameForm
          user={{ id: session.user.id, username: session.user.username || "" }}
        />
      </div>
    </div>
  );
};

export default page;
