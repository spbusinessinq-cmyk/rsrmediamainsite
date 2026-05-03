import { SITE_PHONE } from "@/config/site";

const phone = SITE_PHONE as string;
const PLACEHOLDER = "PASTE_REAL_RSR_HOTLINE_NUMBER_HERE";

export function getDisplayPhone(): string {
  return phone === PLACEHOLDER ? "Hotline: pending publication" : phone;
}

export function getPhoneHref(): string | null {
  if (phone === PLACEHOLDER) return null;
  return `tel:${phone.replace(/\D/g, "")}`;
}
