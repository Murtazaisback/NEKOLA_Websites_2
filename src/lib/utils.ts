import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { Prisma } from "@prisma/client"

export function convertDecimalToNumber(obj: any): any {
  if (obj instanceof Prisma.Decimal) {
    return Number(obj.toString())
  }

  if (Array.isArray(obj)) {
    return obj.map(convertDecimalToNumber)
  }

  if (obj !== null && typeof obj === "object") {
    const newObj: any = {}
    for (const key in obj) {
      newObj[key] = convertDecimalToNumber(obj[key])
    }
    return newObj
  }

  return obj
}
export function getStripeOAuthLink(accountType: "agency" | "subaccount", state: string) {
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_URL}${accountType}&state=${state}`;
}