import { useState, useEffect } from "react";
import { SessionManager } from "../security/sessionManager";
import { authenticateBiometric, verifyPinCode } from "../security/biometricAuth";
import { verifyDeviceBinding, getOrCreateDeviceBinding } from "../security/deviceBinding";

export const useSecurity = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState<boolean>(false);
  const [deviceBound, setDeviceBound] = useState<boolean>(true);

  useEffect(() => {
    // Device binding check
    const isBound = verifyDeviceBinding();
    setDeviceBound(isBound);

    // Session inactivity manager
    const manager = new SessionManager(() => {
      setIsLocked(true);
      setIsVaultUnlocked(false);
    });
    manager.start();

    return () => manager.stop();
  }, []);

  const unlockVaultWithBiometrics = async (): Promise<boolean> => {
    const res = await authenticateBiometric();
    if (res.success) {
      setIsVaultUnlocked(true);
      return true;
    }
    return false;
  };

  const unlockVaultWithPin = (pin: string): boolean => {
    const ok = verifyPinCode(pin);
    if (ok) {
      setIsVaultUnlocked(true);
      return true;
    }
    return false;
  };

  const relockVault = () => {
    setIsVaultUnlocked(false);
  };

  return {
    isLocked,
    isVaultUnlocked,
    deviceBound,
    unlockVaultWithBiometrics,
    unlockVaultWithPin,
    relockVault,
    deviceInfo: getOrCreateDeviceBinding()
  };
};
