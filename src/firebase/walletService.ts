import { doc, getDoc } from "firebase/firestore";
import { auth } from "./config";
import { db } from "./config";

export async function getWalletData() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const docRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("User document not found");
  }

  const data = snapshot.data();

console.log("===== FIRESTORE DOCUMENT =====");
console.log(data);
console.log("Wallet field:", data.wallet);

return {
  wallet: data.wallet,
  profile: data.profile,
};
}