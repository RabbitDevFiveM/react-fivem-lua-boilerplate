import { useRecoilValue } from 'recoil';
import { coreState } from './state';

export const useControlPanel = () => {
  const controlPanelEnabled = useRecoilValue(coreState.controlPanelEnabled);
  return controlPanelEnabled
}

export const useJsonData = () => {
  const jsonData = useRecoilValue(coreState.jsonData);
  return jsonData
}