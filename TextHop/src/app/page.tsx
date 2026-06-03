import Link from "next/link"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const securityWarning =
  "Não utilize este serviço para armazenar senhas, informações bancárias ou dados sensíveis."

export default function Home() {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-center gap-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
              TextHop MVP local
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
                Compartilhe texto entre dispositivos em segundos.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Crie um texto, receba um código curto e um link. Depois abra em outro dispositivo para visualizar e copiar.
              </p>
            </div>
            <Alert className="max-w-xl border-amber-300 bg-amber-50 text-amber-950">
              <AlertDescription className="text-amber-900">
                {securityWarning}
              </AlertDescription>
            </Alert>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants({ size: "lg" })} href="/new">
                Criar texto
              </Link>
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/code"
              >
                Usar código
              </Link>
            </div>
          </div>

          <Card className="bg-background/80 shadow-xl shadow-black/5">
            <CardHeader>
              <CardTitle>Como funciona</CardTitle>
              <CardDescription>Fluxo simples, sem login.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="font-medium">1. Crie o texto</p>
                <p className="mt-1 text-muted-foreground">
                  Cole ou escreva o conteúdo que deseja transferir.
                </p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="font-medium">2. Compartilhe o código</p>
                <p className="mt-1 text-muted-foreground">
                  Use o código curto ou o link direto em outro dispositivo.
                </p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="font-medium">3. Expira em 1 hora</p>
                <p className="mt-1 text-muted-foreground">
                  O armazenamento atual é em memória e apenas para desenvolvimento local.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
