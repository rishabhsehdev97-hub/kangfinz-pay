import { useEffect, useState } from "react";
import App from "../App";
import LoginScreen from "./LoginScreen";
import SplashScreen from "../views/SplashScreen";
import { subscribeToAuth } from "../firebase/auth";

export default function AuthGate() {
  const [user, setUser] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash || !authReady) {
    return <SplashScreen />;
  }

  return user ? <App /> : <LoginScreen />;
}