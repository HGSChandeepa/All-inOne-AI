import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

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
    const { prompt, amount = "1", resolution = "512x512" } = body;

    //if no user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //if no apikety
    if (!configuration.apiKey) {
      return new NextResponse("Unauthorized", { status: 500 });
    }

    //if no message
    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution is required", { status: 400 });
    }

    //check for the free trail

    const freeTrail = await checkApiLimit();
    if (!freeTrail) {
      return new NextResponse("Free trail has expaired", { status: 403 });
    }

    //create the images
    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    //return
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[image error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
