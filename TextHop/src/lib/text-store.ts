const MAX_CONTENT_LENGTH = 10_000

export type SharedText = {
  code: string
  content: string
  createdAt: string
  expiresAt: string
  viewCount: number
}

export type CreateTextInput = {
  content: string
}

export type TextStore = {
  create(input: CreateTextInput): Promise<SharedText>
  findByCode(code: string): Promise<SharedText | null>
}

function normalizeCode(code: string) {
  return code.trim().replaceAll("-", "").replaceAll(" ", "").toUpperCase()
}

export { MAX_CONTENT_LENGTH, normalizeCode }
