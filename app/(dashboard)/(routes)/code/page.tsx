"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import ReactMarkdown from "react-markdown";

export default function page() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  //defingin the form default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  //form loading state
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      //create the new messages
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, response.data, userMessage]);
      console.log(response.data);

      form.reset();
    } catch (error: any) {
      //TODO:open pro Model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={"Code Genaration"}
        description={"Genarate code from your conversation"}
        icon={Code}
        bgColor="text-green-700"
        iconColor="bg-green-700/10"
      />

      <div className=" px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Node js code genaration"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Genarate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className=" p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty lable="No conversations started!" />
          )}
          <div className=" flex flex-col-reverse ">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className=" overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),

                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm leading-7 overflow-hidden"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
