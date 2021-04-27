import { atom } from "recoil";

export const coreState = {
  visibility: atom<boolean>({
    key: "coreStateHidden",
    default: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }),
};
