"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

type CopyButtonProps = {
  value: string
  label?: string
}

export function CopyButton({ value, label = "Copiar" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button type="button" variant="outline" onClick={copy}>
      {copied ? "Copiado" : label}
    </Button>
  )
}
