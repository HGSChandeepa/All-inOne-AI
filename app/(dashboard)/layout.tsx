import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="  h-full relative">
      {/* side pannel for the dashboard */}
      <div className=" hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <div>
          <SideBar />
        </div>
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
