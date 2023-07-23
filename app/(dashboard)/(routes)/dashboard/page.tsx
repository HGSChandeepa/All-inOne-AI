import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <p>Dashboadrd</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
