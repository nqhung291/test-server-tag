import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const clientId = body.clientId;
    const data = {
      client_id: clientId,
      events: [
        {
          name: "purchase",
          params: {},
        },
      ],
    };
    console.log("request data", JSON.stringify(data));
    await axios.post(
      `https://gtm-tcjzt7jq-ogi3z.uc.r.appspot.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
      data
    );
    await axios.post(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
      data
    );
    await axios.post(
      "https://gtm-tcjzt7jq-ogi3z.uc.r.appspot.com/g/collect",
      null,
      {
        params: {
          v: 2,
          tid: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
          cid: clientId,
          en: "purchase",
          t: "pageview",
          dl: "https://test-server-tag.vercel.app/",
        },
      }
    );
    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      error: e,
    });
  }
}
