"use client";

import axios from "axios";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const pushEvent = async (clientId) => {
    try {
      const res = await axios.post(
        "/api/track",
        {
          clientId,
        },
        {
          ...(apiUrl
            ? {
                baseURL: apiUrl,
              }
            : {}),
        }
      );
      console.log(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onClick = async () => {
    try {
      console.log("click button");
      console.log(apiUrl);
      setLoading(true);
      gtag(
        "get",
        process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
        "client_id",
        (client_id) => {
          console.log("ga4_client_id", client_id);
          pushEvent(client_id);
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button disabled={loading} className="p-1 border" onClick={onClick}>
      Click here to push event
    </button>
  );
}
