import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { checkApiLimi, increaseApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//routes
export async function POST(req: Request) {
  try {
    //get user id from clerk
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    //if no user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //if no apikety
    if (!configuration.apiKey) {
      return new NextResponse("Unauthorized", { status: 500 });
    }

    //if no message
    if (!messages) {
      return new NextResponse("No message passed", { status: 400 });
    }

    //?check the API limit exceeded or not
    const freeTrail = await checkApiLimi();

    if (!freeTrail) {
      return new NextResponse("Free trail has expaired", {
        status: 403,
      });
    }

    //create the response
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    //?if all ok now increase the api limit
    await increaseApiLimit();
    //return
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[conversation error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
