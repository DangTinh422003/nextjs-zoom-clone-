"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { error } from "console";
import { use } from "react";

const getToken = async () => {
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
  const streamApiSecret = process.env.STREAM_VIDEO_API_SCREET;

  if (!streamApiKey || !streamApiSecret) {
    throw error("Stream API Key or Secret not found");
  }

  const user = await currentUser();
  console.log("🚀 ~ getToken ~ user:", user);

  if (!user) {
    throw error("User not Authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, expirationTime, issuedAt);
  return token;
};

export default getToken;
