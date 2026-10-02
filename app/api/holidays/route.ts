import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, response: NextResponse) {
  const { data } = await axios.get(
    `https://api.api-ninjas.com/v1/holidays?country=TH&year=${new Date().getFullYear()}`,
    {
      headers: { 'X-Api-Key': process.env.API_NINJAS_KEY },
    }
  )

  return NextResponse.json(data)
}
