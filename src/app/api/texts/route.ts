import { NextResponse } from "next/server"

import { getAppUrl } from "@/lib/app-url"
import { textStore } from "@/lib/store"
import { MAX_CONTENT_LENGTH } from "@/lib/text-store"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { content?: unknown }
    const content = typeof body.content === "string" ? body.content : ""

    const text = await textStore.create({ content })
    const origin = request.headers.get("origin")
    const appUrl = getAppUrl(origin)

    return NextResponse.json({
      code: text.code,
      url: `${appUrl}/t/${text.code}`,
      expiresAt: text.expiresAt,
    })
  } catch (error) {
    if (error instanceof Error && error.message === "EMPTY_CONTENT") {
      return NextResponse.json(
        { message: "Escreva ou cole um texto antes de gerar o código." },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message === "CONTENT_TOO_LONG") {
      return NextResponse.json(
        { message: `O texto deve ter no máximo ${MAX_CONTENT_LENGTH} caracteres.` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Não foi possível criar o texto agora." },
      { status: 500 }
    )
  }
}
