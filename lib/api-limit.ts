import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNT } from "@/constants";

//this function will increase the MAX_FREE_COUNT

export const increaseApiLimit = async () => {
  const { userId } = auth();

  //if no user retuen
  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  //if there is a user with that user id we can increase the count

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

// this function will check weather the user has incresed the free tear

export const checkApiLimit = async () => {
  //check there is a userid
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
    return true;
  } else {
    return false;
  }
};
