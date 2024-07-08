"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export const createOnrampTransactions = async (
  amount: number,
  provider: string
) => {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not found");
  }
  await prisma.onRampTransaction.create({
    data: {
      amount:amount,
      provider,
      userId : Number(userId),
      status: "Processing",
      startTime: new Date(),
      token: token,
    },
  });

  return {
    message: "Transaction created"
  }
};
