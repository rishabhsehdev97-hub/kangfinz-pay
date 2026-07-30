import SplashScreen from "../views/SplashScreen";
import { useEffect, useState } from 'react';
import App from '../App';
import LoginScreen from './LoginScreen';
import { subscribeToAuth } from '../firebase/auth';

export default function AuthGate() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
  return <SplashScreen />;
}

  return user ? <App /> : <LoginScreen />;
}