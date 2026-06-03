"use client"

import { QRCodeSVG } from "qrcode.react"

type QrCodeProps = {
  value: string
}

export function QrCode({ value }: QrCodeProps) {
  return (
    <div className="inline-flex rounded-xl border bg-white p-3 text-black">
      <QRCodeSVG value={value} size={176} marginSize={1} />
    </div>
  )
}
