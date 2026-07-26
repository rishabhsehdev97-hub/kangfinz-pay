import { encryptedStorage } from "./encryptedStorage";

export interface DeviceBindingInfo {
  deviceId: string;
  boundAt: string;
  deviceName: string;
  platform: string;
  status: 'ACTIVE' | 'UNBOUND';
}

export const getOrCreateDeviceBinding = (): DeviceBindingInfo => {
  const existing = encryptedStorage.getItem<DeviceBindingInfo | null>("device_binding", null);
  if (existing && existing.status === 'ACTIVE') {
    return existing;
  }

  const newBinding: DeviceBindingInfo = {
    deviceId: `KF-DEV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    boundAt: new Date().toISOString(),
    deviceName: navigator.userAgent.includes("iPhone") ? "Apple iPhone 15 Pro" : "Android Mobile Device",
    platform: navigator.platform,
    status: 'ACTIVE'
  };

  encryptedStorage.setItem("device_binding", newBinding);
  return newBinding;
};

export const verifyDeviceBinding = (): boolean => {
  const binding = getOrCreateDeviceBinding();
  return binding.status === 'ACTIVE';
};
