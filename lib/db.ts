import { AppUser, BaseBrewData, Brew } from "@/types";
import firebase from "./firebase";
import { getCurrentUser } from "./auth";

const firestore = firebase.firestore();

export async function createUser(uid: string, data: AppUser): Promise<void> {
  return await firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function getUser(uid: string): Promise<AppUser | null> {
  const doc = await firestore.collection("users").doc(uid).get();
  return doc.exists ? (doc.data() as AppUser) : null;
}

export async function createBrew(data: BaseBrewData) {
  const meta = { createdAt: new Date().toISOString(), userId: getCurrentUser().uid };
  const brew = await firestore.collection("brews").add({ ...data, meta });

  return (brew as unknown) as Brew;
}

export async function deleteSite(id) {
  firestore.collection("sites").doc(id).delete();
  const snapshot = await firestore.collection("feedback").where("siteId", "==", id).get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function updateSite(id, newValues) {
  return firestore.collection("sites").doc(id).update(newValues);
}

export function createFeedback(data) {
  return firestore.collection("feedback").add(data);
}

export function deleteFeedback(id) {
  return firestore.collection("feedback").doc(id).delete();
}

export function updateFeedback(id, newValues) {
  return firestore.collection("feedback").doc(id).update(newValues);
}
