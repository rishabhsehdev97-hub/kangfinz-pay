// Light obfuscation & token encryption utility for local storage

const SECRET_SALT = "KangfinzPay_SecureVault_2026";

export const encryptedStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const json = JSON.stringify(value);
      // Encode with base64 and salt
      const encoded = btoa(encodeURIComponent(json) + "::" + SECRET_SALT);
      localStorage.setItem(`kf_sec_${key}`, encoded);
    } catch (e) {
      console.warn("Storage write error", e);
    }
  },

  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const raw = localStorage.getItem(`kf_sec_${key}`);
      if (!raw) return defaultValue;
      const decoded = atob(raw);
      const [json] = decoded.split("::");
      return JSON.parse(decodeURIComponent(json));
    } catch (e) {
      return defaultValue;
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(`kf_sec_${key}`);
  }
};
