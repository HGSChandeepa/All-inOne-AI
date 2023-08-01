import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

//routes
export async function POST(req: Request) {
  try {
    //get user id from clerk
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    //if no user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //if no api key
    if (!process.env.REPLICATE_API_KEY) {
      return new NextResponse("Unauthorized api key", { status: 500 });
    }

    //if no proppt
    if (!prompt) {
      return new NextResponse("promprt is required", { status: 401 });
    }

    //create the response
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );
    //return
    return NextResponse.json(response);
  } catch (error) {
    console.log("[music error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
