export interface Bank {
  id: string;
  name: string;
  shortName: string;
  ifscPrefix: string;
  logo: string;
  upiEnabled: boolean;
  accountMinLength: number;
  accountMaxLength: number;
}

export const banks: Bank[] = [
  {
    id: "HDFC",
    name: "HDFC Bank",
    shortName: "HDFC",
    ifscPrefix: "HDFC",
    logo: "/banks/hdfc.svg",
    upiEnabled: true,
    accountMinLength: 10,
    accountMaxLength: 16,
  },
  {
    id: "SBI",
    name: "State Bank of India",
    shortName: "SBI",
    ifscPrefix: "SBIN",
    logo: "/banks/sbi.svg",
    upiEnabled: true,
    accountMinLength: 11,
    accountMaxLength: 17,
  },
  {
    id: "ICICI",
    name: "ICICI Bank",
    shortName: "ICICI",
    ifscPrefix: "ICIC",
    logo: "/banks/icici.svg",
    upiEnabled: true,
    accountMinLength: 10,
    accountMaxLength: 16,
  },
  {
    id: "AXIS",
    name: "Axis Bank",
    shortName: "Axis",
    ifscPrefix: "UTIB",
    logo: "/banks/axis.svg",
    upiEnabled: true,
    accountMinLength: 10,
    accountMaxLength: 16,
  },
];