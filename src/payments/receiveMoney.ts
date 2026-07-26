export interface DynamicQROptions {
  upiId: string;
  name: string;
  amount?: number;
  note?: string;
}

export const generateDynamicUPIPayload = (options: DynamicQROptions): string => {
  const { upiId, name, amount, note } = options;
  let uri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}`;
  if (amount) uri += `&am=${amount}`;
  if (note) uri += `&tn=${encodeURIComponent(note)}`;
  uri += `&cu=INR`;
  return uri;
};

export const getStaticUPIQRUrl = (upiId: string, name: string, amount?: number): string => {
  const payload = generateDynamicUPIPayload({ upiId, name, amount });
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(payload)}`;
};
