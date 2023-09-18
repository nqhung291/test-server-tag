import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = {
      client_id: body.clientId,
      events: [
        {
          name: "purchase",
        },
      ],
    };
    const res = await axios.post(
      "https://gtm-tcjzt7jq-ogi3z.uc.r.appspot.com/mp/collect",
      data,
      {
        params: {
          measurement_id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
          api_secret: process.env.GA4_API_SECRET,
        },
      }
    );
    return NextResponse.json({
      success: true,
      data: res.data,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      error: e,
    });
  }
}
