"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import { CopyButton } from "@/components/copy-button"
import { QrCode } from "@/components/qr-code"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_24rem]">
        <section className="space-y-6">
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/">
            Voltar
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Criar texto
            </h1>
            <p className="text-muted-foreground">
              Cole ou escreva o texto para gerar um código curto e um link.
            </p>
          </div>
          <Alert className="border-amber-300 bg-amber-50 text-amber-950">
            <AlertDescription className="text-amber-900">
              {securityWarning}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Texto</CardTitle>
              <CardDescription>Expira automaticamente após 1 hora.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={createText}>
                <Textarea
                  className="min-h-72 resize-y text-base"
                  maxLength={10000}
                  placeholder="Cole seu texto aqui..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-muted-foreground">
                    {content.length}/10000 caracteres
                  </span>
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Gerando..." : "Gerar código"}
                  </Button>
                </div>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
              </form>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4 lg:pt-20">
          {createdText ? (
            <Card>
              <CardHeader>
                <CardTitle>Texto criado</CardTitle>
                <CardDescription>
                  Válido até {new Date(createdText.expiresAt).toLocaleTimeString("pt-BR")}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">Código</p>
                  <div className="mt-2 flex flex-col gap-3 rounded-lg border bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <code className="font-mono text-2xl font-semibold tracking-[0.3em]">
                      {createdText.code}
                    </code>
                    <CopyButton value={createdText.code} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Link</p>
                  <div className="mt-2 space-y-3 rounded-lg border bg-muted/40 p-3">
                    <p className="break-all text-sm">{createdText.url}</p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <CopyButton value={createdText.url} label="Copiar link" />
                      <Link
                        className={buttonVariants({ variant: "outline" })}
                        href={`/t/${createdText.code}`}
                      >
                        Abrir
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">QR Code</p>
                  <QrCode value={createdText.url} />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
                <CardDescription>
                  O código e o link aparecem aqui depois da criação.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </aside>
      </div>
    </main>
  )
}
