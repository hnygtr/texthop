export function getAppUrl(origin?: string | null) {
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    origin ??
    "http://localhost:3000"
  ).replace(/\/$/, "")
}
