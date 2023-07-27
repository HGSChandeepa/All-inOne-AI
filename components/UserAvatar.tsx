import { useUser } from "@clerk/nextjs";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function UserAvatar() {
  const { user } = useUser();
  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.profileImageUrl} />

        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
