import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

export default function BotAvatar() {
  return (
    <div>
      <Avatar className="h-5 w-5">
        <AvatarImage className="p-1" src="/logo.png" />
      </Avatar>
    </div>
  );
}
