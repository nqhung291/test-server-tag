"use client";

import axios from "axios";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const pushEvent = async (clientId) => {
    try {
      const res = await axios.post(`${apiUrl}/api/track`, {
        clientId,
      });
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
      pushEvent(126964819.1685982765);

      const clientIdPromise = new Promise((resolve) => {
        gtag(
          "get",
          process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
          "client_id",
          resolve
        );
      });
      const clientId = await clientIdPromise();
      console.log(clientId);
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
