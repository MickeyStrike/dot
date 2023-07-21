import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if(data.username === 'helloworld' || data.password === 'helloworld') return NextResponse.json({ message: 'ok', status: 200 })
    else throw Error
    
  } catch (err) {
    return new NextResponse(JSON.stringify('Internal Server Error'), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}