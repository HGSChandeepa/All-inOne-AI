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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );
    //return
    return NextResponse.json(response);
  } catch (error) {
    console.log("[video error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
