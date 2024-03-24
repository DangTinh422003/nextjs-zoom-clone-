"use client";
import DescriptionInput from "@/components/DescriptionInput";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const CreateMeetingPage = () => {
  const [desc, setDesc] = useState("");
  const client = useStreamVideoClient();
  const { user } = useUser();

  if (!user || !client) {
    return <Loader2 className="mx-auto animate-spin"></Loader2>;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user.username}
      </h1>
      <div className="rounded-mdp-5 mx-auto w-80 space-y-6">
        <h2 className="text-xl font-bold ">Create a new meeting</h2>
        <DescriptionInput value={desc} onChange={setDesc} />
      </div>
    </div>
  );
};

export default CreateMeetingPage;
