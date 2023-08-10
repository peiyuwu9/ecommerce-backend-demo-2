import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const dateFormatter = new Intl.DateTimeFormat("en-US");

export async function imageProcessor(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // Maybe use npm sharp to resize image: https://www.npmjs.com/package/sharp
  return buffer;
}
