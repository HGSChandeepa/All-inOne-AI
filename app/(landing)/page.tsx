import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      LandingPage(not protected)
      <div>
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
