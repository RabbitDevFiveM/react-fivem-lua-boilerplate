import { useSetRecoilState } from "recoil";
import { useVisibility } from "./useVisibility";
import { useJsonData, useControlPanel } from "./useData";
import { coreState } from "./state";
import { useNuiEvent } from "fivem-nui-react-lib";

export const useCoreService = () => {
  const setShowHide = useSetRecoilState(coreState.visibility);
  // You can change these strings to whatever you wish :)
  useNuiEvent<boolean>("REACTNUI", "setVisibility", setShowHide);
  return useVisibility();
};

export const useJsonDataService = () => {
  const jsonData = useSetRecoilState(coreState.jsonData);
  useNuiEvent<boolean>("REACTNUI", "setJsonData", jsonData);
  return useJsonData();
};

export const useControlPanelService = () => {
  const controlPanel = useSetRecoilState(coreState.controlPanel);
  useNuiEvent<boolean>("REACTNUI", "setControlPanel", controlPanel);
  return useControlPanel();
};