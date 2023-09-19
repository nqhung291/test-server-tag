"use client";

import axios from "axios";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "";
const mesurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export default function Home() {
  const [loading, setLoading] = useState(false);

  const getGtagClientId = () => {
    if (typeof window !== "undefined") {
      return new Promise((resolve) =>
        gtag("get", mesurementId, "client_id", resolve)
      );
    }
  };

  const onClick = async () => {
    try {
      setLoading(true);
      const clientId = "126964819.1685982765";
      console.log("click button", clientId);
      const res = await axios.post(`${apiUrl}/api/track`, {
        clientId,
      });
      console.log("response", res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} className="p-1 border" onClick={onClick}>
      Click here to push event
    </button>
  );
}
