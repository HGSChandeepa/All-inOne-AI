import React from "react";
import Image from "next/image";
export default function () {
  return (
    <div className=" h-full flex flex-col gap-y-4 items-center justify-center">
      <div className=" w-10 h-10 relative animate-spin">
        <Image alt="empty" fill src={"/logo.png"} />
      </div>
      <p className="text-sm text-muted-foreground">
        {" "}
        All-In One AI is Thinking...
      </p>
    </div>
  );
}
