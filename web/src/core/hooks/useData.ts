import { useRecoilValue } from 'recoil';
import { coreState } from './state';

export const useControlPanel = () => {
  const controlPanel = useRecoilValue(coreState.controlPanel);
  return controlPanel
}

export const useShowBanWeapon = () => {
  const showBanWeapon = useRecoilValue(coreState.showBanWeapon);
  return showBanWeapon
}

export const useJsonData = () => {
  const jsonData = useRecoilValue(coreState.jsonData);
  return jsonData
}