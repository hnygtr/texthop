import Link from "next/link"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"

const securityWarning =
  "Não utilize este serviço para armazenar senhas, informações bancárias ou dados sensíveis."

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-md flex-col justify-center">
        <div className="space-y-7">
          <header className="space-y-1">
            <p className="text-sm font-semibold tracking-tight">TextHop</p>
            <p className="text-xs text-muted-foreground">MVP local · expira em 1 hora</p>
          </header>

          <section className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Compartilhar texto
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              Envie texto entre dispositivos usando um código curto ou link direto.
            </p>
          </section>

          <nav className="grid gap-3">
            <Link className={buttonVariants({ size: "lg", className: "h-12" })} href="/new">
              Criar texto
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-12" })}
              href="/code"
            >
              Usar código
            </Link>
          </nav>

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
