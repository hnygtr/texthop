import Link from "next/link"

import { CopyButton } from "@/components/copy-button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Link className="text-sm text-muted-foreground hover:text-foreground" href="/">
          Voltar
        </Link>
        <Alert className="border-amber-300 bg-amber-50 text-amber-950">
          <AlertDescription className="text-amber-900">
            {securityWarning}
          </AlertDescription>
        </Alert>

        {text ? (
          <Card>
            <CardHeader>
              <CardTitle>Texto recebido</CardTitle>
              <CardDescription>
                Código {text.code} · expira às {new Date(text.expiresAt).toLocaleTimeString("pt-BR")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-lg border bg-background p-4 font-sans text-base leading-7">
                {text.content}
              </pre>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CopyButton value={text.content} label="Copiar texto" />
                <Link className={buttonVariants({ variant: "outline" })} href="/new">
                  Criar outro texto
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Texto não encontrado</CardTitle>
              <CardDescription>
                O código informado não existe ou o texto expirou após 1 hora.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants()} href="/code">
                Tentar outro código
              </Link>
              <Link className={buttonVariants({ variant: "outline" })} href="/new">
                Criar texto
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
