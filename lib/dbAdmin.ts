import { db } from "./firebaseAdmin";

export async function getAllBrews() {
  try {
    const snapshot = await db.collection("brews").get();
    const feedback = [];
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });
    return { feedback };
  } catch (error) {
    return { error };
  }
}
