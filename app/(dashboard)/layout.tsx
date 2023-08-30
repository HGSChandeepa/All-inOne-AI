import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="  h-full relative">
      {/* side pannel for the dashboard */}
      <div className=" hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SideBar apiLimitCount={apiLimitCount} />
      </div>

      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
