"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import { CopyButton } from "@/components/copy-button"
import { QrCode } from "@/components/qr-code"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const securityWarning =
  "Não utilize este serviço para armazenar senhas, informações bancárias ou dados sensíveis."

type CreatedText = {
  code: string
  url: string
  expiresAt: string
}

export default function NewTextPage() {
  const [content, setContent] = useState("")
  const [createdText, setCreatedText] = useState<CreatedText | null>(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function createText(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message ?? "Não foi possível criar o texto.")
        return
      }

      setCreatedText(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <header className="flex items-center justify-between gap-4">
          <Link className="text-sm font-semibold tracking-tight" href="/">
            TextHop
          </Link>
          <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/code">
            Usar código
          </Link>
        </header>

        <section className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Criar texto</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Cole ou escreva o texto para gerar um código curto e um link.
          </p>
        </section>

        <Alert className="border-amber-200 bg-amber-50 text-amber-950">
          <AlertDescription className="text-sm leading-6 text-amber-900">
            {securityWarning}
          </AlertDescription>
        </Alert>

        <form className="space-y-3" onSubmit={createText}>
          <Textarea
            className="min-h-56 resize-y p-4 text-base leading-7 sm:min-h-80"
            maxLength={10000}
            placeholder="Cole seu texto aqui..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">{content.length}/10000 caracteres</span>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Gerando..." : "Gerar código"}
            </Button>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>

        {createdText ? (
          <section className="space-y-4 border-t pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-medium">Texto criado</h2>
                <p className="text-sm text-muted-foreground">
                  Válido até {new Date(createdText.expiresAt).toLocaleTimeString("pt-BR")}.
                </p>
              </div>
              <Link className={buttonVariants({ variant: "outline" })} href={`/t/${createdText.code}`}>
                Abrir
              </Link>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Código</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <code className="font-mono text-4xl font-semibold tracking-[0.2em] sm:text-5xl">
                  {createdText.code}
                </code>
                <CopyButton value={createdText.code} />
              </div>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Link</p>
              <p className="mt-2 break-all text-sm leading-6">{createdText.url}</p>
              <div className="mt-3">
                <CopyButton value={createdText.url} label="Copiar link" />
              </div>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">QR Code</p>
              <QrCode value={createdText.url} />
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
