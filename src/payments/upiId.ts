export interface UPIValidationResult {
  isValid: boolean;
  upiId: string;
  verifiedName?: string;
  bankName?: string;
}

export const validateUPIId = (upiId: string): UPIValidationResult => {
  const clean = upiId.trim().toLowerCase();
  const upiRegex = /^[\w.-]+@[\w.-]+$/;
  if (!upiRegex.test(clean)) {
    return { isValid: false, upiId: clean };
  }

  const parts = clean.split("@");
  const handle = parts[1];
  let bankName = "Verified Bank";
  if (handle.includes("hdfc")) bankName = "HDFC Bank";
  else if (handle.includes("icici")) bankName = "ICICI Bank";
  else if (handle.includes("sbi")) bankName = "State Bank of India";
  else if (handle.includes("axis")) bankName = "Axis Bank";
  else if (handle.includes("paytm")) bankName = "Paytm Payments Bank";

  return {
    isValid: true,
    upiId: clean,
    verifiedName: parts[0].replace(/[._]/g, ' ').toUpperCase(),
    bankName
  };
};
