"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const securityWarning =
  "Não utilize este serviço para armazenar senhas, informações bancárias ou dados sensíveis."

export default function CodePage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  function useCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedCode = code.trim().replaceAll("-", "").replaceAll(" ", "").toUpperCase()

    if (!normalizedCode) {
      setError("Digite um código para continuar.")
      return
    }

    window.location.href = `/t/${normalizedCode}`
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-md flex-col justify-center">
        <div className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <Link className="text-sm font-semibold tracking-tight" href="/">
              TextHop
            </Link>
            <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/new">
              Criar texto
            </Link>
          </header>

          <section className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Usar código</h1>
            <p className="text-sm leading-6 text-muted-foreground">Digite o código curto gerado em outro dispositivo.</p>
          </section>

          <form className="space-y-3" onSubmit={useCode}>
            <Input
              autoCapitalize="characters"
              autoComplete="off"
              className="h-14 text-center font-mono text-2xl tracking-[0.22em]"
              placeholder="K7P9Q2"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="h-11 w-full" type="submit">
              Abrir texto
            </Button>
          </form>

          <Alert className="border-amber-200 bg-amber-50 text-amber-950">
            <AlertDescription className="text-sm leading-6 text-amber-900">
              {securityWarning}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </main>
  )
}
