"use client";

import axios from "axios";

export default function Home() {
  const pushEvent = async (clientId) => {
    try {
      const res = await axios.post("/api/track", {
        clientId,
      });
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = async () => {
    try {
      gtag(
        "get",
        process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
        "client_id",
        (client_id) => {
          pushEvent(client_id);
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className="p-1 border" onClick={onClick}>
      Click here to push event
    </button>
  );
}
