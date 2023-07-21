import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function GET() {
  try {
    const response = await axios.get('https://api.rajaongkir.com/starter/province', { headers: { key: process.env.API_KEY } })
    return NextResponse.json(response.data)

  } catch (err) {
    const error = err as AxiosError
    const error_response = {
      status: 500,
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}