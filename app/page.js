"use client";

import axios from "axios";

export default function Home() {
  const onClick = async () => {
    try {
      const res = await axios.post("/api/track");
      console.log(res.data);
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
