import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const response = await axios.get(`https://api.rajaongkir.com/starter/city?province=${id}`, { headers: { key: process.env.API_KEY } })
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