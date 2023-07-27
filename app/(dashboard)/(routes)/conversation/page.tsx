"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function page() {
  //defingin the form default values
  const form = useForm({
    defaultValues: {
      propmt: "",
    },
  });

  return (
    <div>
      <Heading
        title={"Coversation"}
        description={"Most advanced convverdation modal"}
        icon={MessageSquare}
        bgColor="text-violet-500"
        iconColor="bg-violet-500/10"
      />

      <div className=" px-4 lg:px-8"></div>
    </div>
  );
}
