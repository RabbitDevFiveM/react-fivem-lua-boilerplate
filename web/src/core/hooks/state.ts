import { atom, selector } from "recoil";

export const coreState = {
  visibility: atom<boolean>({
    key: "coreStateHidden",
    default: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }),
  data: atom<any>({
    key: "dataState",
    default: "EmAdthasit",
  }),
  jsonData: atom<any>({
    key: "jsonState",
    default: {
      count: 3
    },
  }),
};

export const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(coreState.data);
    return text.length;
  },
});