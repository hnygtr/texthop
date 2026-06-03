import { generateCode } from "@/lib/code"
import {
  MAX_CONTENT_LENGTH,
  normalizeCode,
  type SharedText,
  type TextStore,
} from "@/lib/text-store"

const TEXT_TTL_MS = 60 * 60 * 1000

type StoredText = Omit<SharedText, "createdAt" | "expiresAt"> & {
  createdAt: number
  expiresAt: number
}

const memoryStore = globalThis as typeof globalThis & {
  __texthopTexts?: Map<string, StoredText>
}

const texts = memoryStore.__texthopTexts ?? new Map<string, StoredText>()
memoryStore.__texthopTexts = texts

function cleanupExpired(now = Date.now()) {
  for (const [code, text] of texts) {
    if (text.expiresAt <= now) {
      texts.delete(code)
    }
  }
}

function serializeText(text: StoredText): SharedText {
  return {
    ...text,
    createdAt: new Date(text.createdAt).toISOString(),
    expiresAt: new Date(text.expiresAt).toISOString(),
  }
}

export const memoryTextStore: TextStore = {
  async create({ content }) {
    cleanupExpired()

    const trimmedContent = content.trim()

    if (!trimmedContent) {
      throw new Error("EMPTY_CONTENT")
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      throw new Error("CONTENT_TOO_LONG")
    }

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const code = generateCode()

      if (!texts.has(code)) {
        const now = Date.now()
        const text: StoredText = {
          code,
          content,
          createdAt: now,
          expiresAt: now + TEXT_TTL_MS,
          viewCount: 0,
        }

        texts.set(code, text)

        return serializeText(text)
      }
    }

    throw new Error("CODE_GENERATION_FAILED")
  },

  async findByCode(code) {
    cleanupExpired()

    const normalizedCode = normalizeCode(code)
    const text = texts.get(normalizedCode)

    if (!text || text.expiresAt <= Date.now()) {
      if (text) {
        texts.delete(normalizedCode)
      }

      return null
    }

    text.viewCount += 1

    return serializeText(text)
  },
}
