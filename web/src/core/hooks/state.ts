import { atom, selector } from "recoil";

export const coreState = {
  visibility: atom<boolean>({
    key: "coreStateHidden",
    default: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  }),
  controlPanelEnabled: atom<boolean>({
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
      right: {
        score: 3,
        logo: "https://media.discordapp.net/attachments/811639071599755304/832920624727851008/023.png",
        star: 1,
      },
      left: {
        score: 3,
        logo: "https://cdn.discordapp.com/attachments/775913267079544842/843907074874408990/JAK.png",
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