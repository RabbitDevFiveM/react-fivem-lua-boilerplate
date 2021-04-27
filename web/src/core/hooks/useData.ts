import { useRecoilValue } from 'recoil';
import { coreState } from './state';

export const useData = () => {
  const data = useRecoilValue(coreState.data);
  return data
}

export const useJsonData = () => {
  const jsonData = useRecoilValue(coreState.jsonData);
  return jsonData
}