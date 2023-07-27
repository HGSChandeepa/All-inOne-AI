import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

export default function BotAvatar() {
  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage className="p-1" src="/logo.png" />
      </Avatar>
    </div>
  );
}
