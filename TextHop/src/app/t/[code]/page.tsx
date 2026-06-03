import Link from "next/link"

import { CopyButton } from "@/components/copy-button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { textStore } from "@/lib/store"

const securityWarning =
  "Não utilize este serviço para armazenar senhas, informações bancárias ou dados sensíveis."

export default async function TextPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const text = await textStore.findByCode(code)

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-3xl space-y-5">
        <header className="flex items-center justify-between gap-4">
          <Link className="text-sm font-semibold tracking-tight" href="/">
            TextHop
          </Link>
          <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/new">
            Criar texto
          </Link>
        </header>

        {text ? (
          <>
            <section className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Texto recebido</h1>
                <p className="text-sm text-muted-foreground">
                  Código {text.code} · expira às {new Date(text.expiresAt).toLocaleTimeString("pt-BR")}
                </p>
              </div>
              <CopyButton value={text.content} label="Copiar texto" />
            </section>

            <pre className="max-h-[68vh] overflow-auto whitespace-pre-wrap rounded-xl border bg-muted/20 p-4 font-sans text-base leading-7 sm:p-5">
              {text.content}
            </pre>

            <div>
              <Link className={buttonVariants({ variant: "outline" })} href="/new">
                Criar outro texto
              </Link>
            </div>
          </>
        ) : (
          <section className="flex min-h-[calc(100vh-11rem)] flex-col justify-center space-y-5">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Texto não encontrado</h1>
              <p className="text-sm leading-6 text-muted-foreground">
                O código informado não existe ou o texto expirou após 1 hora.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants()} href="/code">
                Tentar outro código
              </Link>
              <Link className={buttonVariants({ variant: "outline" })} href="/new">
                Criar texto
              </Link>
            </div>
          </section>
        )}

        <Alert className="border-amber-200 bg-amber-50 text-amber-950">
          <AlertDescription className="text-sm leading-6 text-amber-900">
            {securityWarning}
          </AlertDescription>
        </Alert>
      </div>
    </main>
  )
}
