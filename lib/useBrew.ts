import { BaseBrewData, Brew } from "@/types";
import { createBrew } from "./db";

export const useBrew = (): UseBrew => {
  const addBrew = async (brew: BaseBrewData): Promise<Brew> => {
    const newBrew = await createBrew(brew);
    return newBrew;
  };
  return {
    addBrew,
  };
};

type UseBrew = {
  addBrew: (brew: BaseBrewData) => Promise<Brew>;
};

export default useBrew;
