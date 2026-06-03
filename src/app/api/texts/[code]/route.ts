import { NextResponse } from "next/server"

import { textStore } from "@/lib/store"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const text = await textStore.findByCode(code)

  if (!text) {
    return NextResponse.json(
      { message: "Texto não encontrado ou expirado." },
      { status: 404 }
    )
  }

  return NextResponse.json(text)
}
