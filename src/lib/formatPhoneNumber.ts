export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "")

  // Format based on length
  if (cleaned.length === 10) {
    // US format: (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    // US format with country code: +1 (XXX) XXX-XXXX
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  } else if (cleaned.length === 7) {
    // Local format: XXX-XXXX
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else {
    // For other formats, add spaces every 3-4 digits
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
  }
}
