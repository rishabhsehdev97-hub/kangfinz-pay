export interface ParsedQR {
  upiId: string;
  name: string;
  amount?: number;
  note?: string;
  rawPayload: string;
}

export const parseUPIQRCode = (qrString: string): ParsedQR | null => {
  if (!qrString) return null;
  
  // Format: upi://pay?pa=merchant@upi&pn=MerchantName&am=500&tn=Coffee
  if (qrString.startsWith("upi://pay")) {
    try {
      const url = new URL(qrString);
      const params = new URLSearchParams(url.search);
      return {
        upiId: params.get("pa") || "merchant@upi",
        name: params.get("pn") || "Merchant",
        amount: params.get("am") ? parseFloat(params.get("am")!) : undefined,
        note: params.get("tn") || "QR Payment",
        rawPayload: qrString
      };
    } catch (e) {
      // fallback parsing
    }
  }

  // Fallback string parser
  return {
    upiId: qrString.includes("@") ? qrString : `${qrString.replace(/\s+/g, '').toLowerCase()}@upi`,
    name: "UPI Merchant",
    rawPayload: qrString
  };
};
