import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { origin, destination, weight, courier } = data

    const payload = {
      origin,
      destination,
      weight,
      courier
    }

    const response = await axios.post(`https://api.rajaongkir.com/starter/cost`, payload, { headers: { key: process.env.API_KEY } })
    return NextResponse.json(response.data)
    
  } catch (err) {
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}