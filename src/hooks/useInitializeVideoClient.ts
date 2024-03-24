import getToken from "@/app/action";
import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const useInitializeVideoClient = (): StreamVideoClient | null => {
  const { isLoaded: userLoaded, user } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    if (!userLoaded) return;

    let streamUser: User;
    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.username ?? user.id,
        image: user.imageUrl,
      };
    } else {
      const id = nanoid();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [userLoaded, user?.id, user?.imageUrl, user?.username]);

  return videoClient;
};

export default useInitializeVideoClient;
