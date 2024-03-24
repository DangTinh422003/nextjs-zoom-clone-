"use client";
import useInitializeVideoClient from "@/hooks/useInitializeVideoClient";
import { StreamVideo } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import React, { PropsWithChildren } from "react";

const ClientProvider = ({ children }: PropsWithChildren) => {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin "></Loader2>{" "}
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default ClientProvider;
