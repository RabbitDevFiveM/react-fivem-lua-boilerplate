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
  showBanWeapon: atom<boolean>({
    key: "coreShowBanWeapon",
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
        logo: "https://media.discordapp.net/attachments/811639071599755304/832920624727851008/023.png",
        star: 2,
        wood: 0,
        knuckle: 0,
        knife: 0,
        bottle: 0,
      },
      left: {
        score: 3,
        logo: "https://cdn.discordapp.com/attachments/775913267079544842/843907074874408990/JAK.png",
        star: 3,
        wood: 0,
        knuckle: 0,
        knife: 0,
        bottle: 0,
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