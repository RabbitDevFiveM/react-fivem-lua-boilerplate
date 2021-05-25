import { atom, selector } from "recoil";

export const coreState = {
  visibility: atom<boolean>({
    key: "coreStateHidden",
    default: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }),
  controlPanel: atom<boolean>({
    key: "coreControlHidden",
    default: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }),
  data: atom<any>({
    key: "dataState",
    default: "EmAdthasit",
  }),
  jsonData: atom<any>({
    key: "jsonState",
    default: {
      weaponBlock: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
      right: {
        score: 3,
        logo: "https://cdn.discordapp.com/attachments/832994803922239569/846760132817453106/FiveM-Emblem.png",
        star: 2,
      },
      left: {
        score: 3,
        logo: "https://cdn.discordapp.com/attachments/832994803922239569/843880835584622612/rabbit_logo.png",
        star: 3,
      }
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