import { generateCode } from "@/lib/code"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import {
  MAX_CONTENT_LENGTH,
  normalizeCode,
  type SharedText,
  type TextStore,
} from "@/lib/text-store"

const TEXT_TTL_MS = 60 * 60 * 1000

type TextRow = {
  code: string
  content: string
  created_at: string
  expires_at: string
  view_count: number
}

function serializeText(row: TextRow): SharedText {
  return {
    code: row.code,
    content: row.content,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    viewCount: row.view_count,
  }
}

export const supabaseTextStore: TextStore = {
  async create({ content }) {
    const trimmedContent = content.trim()

    if (!trimmedContent) {
      throw new Error("EMPTY_CONTENT")
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      throw new Error("CONTENT_TOO_LONG")
    }

    const supabase = createSupabaseServerClient()

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const now = new Date()
      const expiresAt = new Date(now.getTime() + TEXT_TTL_MS)
      const code = generateCode()
      const { data, error } = await supabase
        .from("texts")
        .insert({
          code,
          content,
          created_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .select("code, content, created_at, expires_at, view_count")
        .single<TextRow>()

      if (!error && data) {
        return serializeText(data)
      }

      if (error?.code !== "23505") {
        throw new Error("TEXT_CREATE_FAILED")
      }
    }

    throw new Error("CODE_GENERATION_FAILED")
  },

  async findByCode(code) {
    const normalizedCode = normalizeCode(code)
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from("texts")
      .select("code, content, created_at, expires_at, view_count")
      .eq("code", normalizedCode)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle<TextRow>()

    if (error) {
      throw new Error("TEXT_FIND_FAILED")
    }

    if (!data) {
      return null
    }

    await supabase.rpc("increment_text_view_count", { text_code: normalizedCode })

    return serializeText({
      ...data,
      view_count: data.view_count + 1,
    })
  },
}
