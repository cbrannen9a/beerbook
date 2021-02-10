import { Brew } from "@/types";
import { db } from "./firebaseAdmin";

export const getAllBrews = async (): Promise<
  | {
      brews: Brew[];
      error?: undefined;
    }
  | {
      error: Error;
      brews?: undefined;
    }
> => {
  try {
    const snapshot = await db.collection("brews").get();
    const brews = [];
    snapshot.forEach((doc) => {
      brews.push({ id: doc.id, ...doc.data() });
    });
    return { brews };
  } catch (error) {
    return { error };
  }
};
