"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <main className="flex min-h-screen items-center bg-muted/30 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <Link className="text-sm text-muted-foreground hover:text-foreground" href="/">
          Voltar
        </Link>
        <Alert className="border-amber-300 bg-amber-50 text-amber-950">
          <AlertDescription className="text-amber-900">
            {securityWarning}
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Usar código</CardTitle>
            <CardDescription>
              Digite o código curto gerado em outro dispositivo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={useCode}>
              <Input
                autoCapitalize="characters"
                autoComplete="off"
                className="h-12 font-mono text-lg tracking-[0.2em]"
                placeholder="K7P9Q2"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button className="w-full" type="submit">
                Abrir texto
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
