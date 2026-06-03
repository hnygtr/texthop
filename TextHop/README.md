# TextHop

Site para compartilhar textos entre dispositivos usando código curto, link e QR Code.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Por padrão, o projeto usa armazenamento em memória:

```env
TEXT_STORE=memory
```

Esse modo é apenas para desenvolvimento local.

## Supabase

Antes de usar Supabase, execute o SQL em `supabase/schema.sql` no projeto Supabase.

Depois configure as variáveis de ambiente:

```env
NEXT_PUBLIC_APP_URL=https://sua-url.vercel.app
TEXT_STORE=supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` deve ficar somente no backend. Não use prefixo `NEXT_PUBLIC_` para segredos.

## Build

```bash
npm run build
```

## Vercel

Para deploy na Vercel, configure as mesmas variáveis no painel do projeto.

Use `TEXT_STORE=supabase` em produção. O storage em memória não é confiável em ambiente serverless.
