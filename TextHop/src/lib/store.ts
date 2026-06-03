import { memoryTextStore } from "@/lib/memory-text-store"
import { supabaseTextStore } from "@/lib/supabase-text-store"

export const textStore =
  process.env.TEXT_STORE === "supabase" ? supabaseTextStore : memoryTextStore
