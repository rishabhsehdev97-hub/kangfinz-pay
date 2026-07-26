import { useState, useEffect } from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  subscribeToAuth,
  signInWithGoogle,
  signInWithApple,
  signInAsGuest,
  sendMobileOtp,
  signOutUser
} from "../firebase/auth";
import { getUserProfile, saveUserProfile } from "../firebase/services";
import { ensureUserSeeded } from "../firebase/initialSeed";
import { UserProfile } from "../types";

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Ensure user collections are seeded in Firestore
        const defaultName = firebaseUser.displayName || "Rishabh Sehdev";
        const defaultEmail = firebaseUser.email || "rishabh@kangfinz.com";
        await ensureUserSeeded(firebaseUser.uid, defaultName, defaultEmail);

        // Fetch user profile from Firestore
        let userProf = await getUserProfile(firebaseUser.uid);
        if (!userProf) {
          userProf = {
            uid: firebaseUser.uid,
            name: defaultName,
            email: defaultEmail,
            phone: firebaseUser.phoneNumber || "+91 98765 43210",
            photoURL: firebaseUser.photoURL || undefined,
            kycVerified: true,
            tier: "Premium",
            upiId: `${defaultName.toLowerCase().replace(/\s+/g, '')}@kangfinz`,
            createdAt: new Date().toISOString()
          };
          await saveUserProfile(userProf);
        }
        setProfile(userProf);
      } else {
        // Automatically initiate guest session so the user can seamlessly test everything!
        try {
          const guest = await signInAsGuest();
          setUser(guest);
        } catch (e) {
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    setLoading(true);
    const u = await signInWithGoogle();
    setUser(u);
    setLoading(false);
  };

  const loginApple = async () => {
    setLoading(true);
    const u = await signInWithApple();
    setUser(u);
    setLoading(false);
  };

  const loginGuest = async () => {
    setLoading(true);
    const u = await signInAsGuest();
    setUser(u);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await signOutUser();
    setProfile(null);
    setUser(null);
    setLoading(false);
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!user || !profile) return;
    const newProf: UserProfile = { ...profile, ...updated };
    setProfile(newProf);
    await saveUserProfile(newProf);
  };

  return {
    user,
    profile,
    loading,
    loginGoogle,
    loginApple,
    loginGuest,
    sendMobileOtp,
    logout,
    updateProfile
  };
};
