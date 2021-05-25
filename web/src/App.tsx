import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import "./tailwind.css"

import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService, useJsonDataService, useControlPanelService } from './core/hooks/useCoreService';

import { useJsonData, useControlPanel } from './core/hooks/useData';
import { coreState } from './core/hooks/state';
import { useSetRecoilState } from "recoil";

import { useNuiRequest } from "fivem-nui-react-lib";

const createStar = (star) => {
  const elements = [] as  any;
  var i = 0
  for (var i = 0; i < star; i++) {
    elements.push(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>)
  }
  return elements;
};

function useInput({ type, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const input = <input className="form-input bg-white focus:bg-gray-100 rounded w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}

function App() {
  useCoreService()
  useJsonDataService()
  useControlPanelService()
  const jsonData = useJsonData()
  const controlPanelEnabled = useControlPanel()
  const setJsonDataCount = useSetRecoilState(coreState.jsonData);
  const visibility = useVisibility()

  const { left, right } = jsonData

  const { send } = useNuiRequest();

  const [title, titleInput] = useInput({ type: "text", defaultValue: "" });
  const [title2, title2Input] = useInput({ type: "text", defaultValue: "" });
  const [title3, title3Input] = useInput({ type: "text", defaultValue: "" });

  const [leftLogo, urlLeftInput] = useInput({ type: "url", defaultValue: "" });
  const [leftScore, leftScoreInput] = useInput({ type: "number", defaultValue: 0 });
  const [leftStar, leftStarInput] = useInput({ type: "number", defaultValue: 0 });

  const [rightLogo, urlRightInput] = useInput({ type: "url", defaultValue: "" });
  const [rightScore, rightScoreInput] = useInput({ type: "number", defaultValue: 0 });
  const [rightStar, rightStarInput] = useInput({ type: "number", defaultValue: 0 });

  const [statusShowUI, setStatusShowUI] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      send("Close", {})
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const demo = (e) => {
    e.preventDefault();
    setJsonDataCount({
      left: {
        score: leftScore,
        logo: leftLogo,
        star: leftStar,
      },
      right: {
        score: rightScore,
        logo: rightLogo,
        star: rightStar,
      },
    })
  };

  const closeAll = (e) => {
    setStatusShowUI(false)
    e.preventDefault();
    send("Submit", {
      showUi: false,
    })
  };

  const submit = (e) => {
    setStatusShowUI(true)
    e.preventDefault();
    send("Submit", {
      showUi: true,
      left: {
        score: leftScore,
        logo: leftLogo,
        star: leftStar,
      },
      right: {
        score: rightScore,
        logo: rightLogo,
        star: rightStar,
      }
    })
  };

  return (
    <div className="container w-full max-w-screen-md mx-auto pt-8 justify-center justify-self-auto" style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
        <div className="box-content justify-center justify-self-auto h-12 w-full p-4 border-2 rounded-3xl flex justify-between bg-gradient-to-r from-gray-800 to-black">
          {/* Left */}
          <div className="flex justify-around content-center items-center w-1/3">
            {/* Logo Left */}
            <div>
              <img className="object-scale-down h-16 rounded-full flex items-center justify-center" src={left.logo}/>
            </div>
            {/* Score Left */}
            <div className="flex content-center items-center">
              <h1 className="text-white text-4xl font-bold">{left.score}</h1>
            </div>
          </div>
          {/* Center */}
          <div className="flex flex-col justify-center justify-items-center items-center content-center w-1/2">
            <h1 className="flex justify-center leading-6 text-white text-md font-semibold">{jsonData.title}</h1>
            <h1 className="flex justify-center leading-6 text-white text-xl font-bold">{jsonData.title2}</h1>
            <h1 className="flex justify-center leading-6 text-white text-md font-semibold">{jsonData.title3}</h1>
          </div>
          {/* Right */}
          <div className="flex flex-row-reverse justify-around content-center items-center w-1/3">
            {/* Logo Right */}
            <div>
              <img className="object-scale-down h-16 rounded-full flex items-center justify-center" src={right.logo}/>
            </div>
            {/* Score Right */}
            <div>
              <div className="flex content-center items-center">
                <h1 className="text-white text-4xl font-bold">{right.score}</h1>
              </div>
            </div>
          </div>
        </div>
        {/* Star */}
        <div className="flex flex-row box-content px-4 h-6 w-full rounded-3xl flex justify-between">
          <div className="flex w-1/2 justify-start">
            {
              createStar(left.star)
            }
          </div>
          <div className="flex w-1/2 justify-end">
            {
              createStar(right.star)
            }
          </div>
        </div>
        {/* Control Panel */}
        <div style={ controlPanelEnabled ? { visibility: 'visible' } : { visibility: 'hidden' }} className="w-full max-w-xl absolute bottom-px box-content p-4 w-2/3 right-40">
          <form className="bg-gradient-to-r from-gray-800 to-black border-2 rounded-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="pb-8 text-white text-lg font-bold">แผงควบคุม</h1>
            <div>
              <label className="text-white text-md">Text (บนสุด)</label>
              {titleInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-md">Text (กลาง)</label>
                  {title2Input}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-white text-md">Text (ล่าง)</label>
                  {title3Input}
                </div>
              </div>
            </div>
            <div>
              <label className="text-white text-md">Url Logo ทีมซ้าย</label>
              {urlLeftInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-md">คะแนน ทีมซ้าย</label>
                  {leftScoreInput}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-md">ดาว ทีมซ้าย</label>
                  {leftStarInput}
                </div>
              </div>
            </div>
            <div>
              <label className="text-white text-md">Url Logo ทีมขวา</label>
              {urlRightInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-md">คะแนน ทีมขวา</label>
                  {rightScoreInput}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-md">ดาว ทีมขวา</label>
                  {rightStarInput}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around justify-items-center items-center content-center w-full pt-8">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button" onClick={demo}>ตัวอย่าง</button>
              <button className={`bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded ${statusShowUI && "ring ring-green-200"}`} type="button" onClick={submit}>แสดงทุกคน</button>
              <button className={`bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded ${!statusShowUI && "ring ring-yellow-200"}`} type="button" onClick={closeAll}>ปิดทุกคน</button>
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" type="button" onClick={() => send("Close", {})}>ปิด</button>
            </div>
            <br/>
            <h3 className="text-white float-right">Free version</h3>
            <br/>
            <h3 className="text-white float-right text-xs">Developed by Em Adthasit</h3>
          </form>
        </div>
      </div>
  );
}

export default App;
