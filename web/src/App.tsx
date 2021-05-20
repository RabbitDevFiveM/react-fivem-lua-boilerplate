import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import "./tailwind.css"

import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService, useJsonDataService, useControlPanelService, useShowBanWeaponService } from './core/hooks/useCoreService';

import { useJsonData, useControlPanel, useShowBanWeapon } from './core/hooks/useData';
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

function useInput({ type }) {
  const [value, setValue] = useState("");
  const input = <input className="form-input bg-white focus:bg-gray-100 rounded w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}

function App() {
  useCoreService()
  useJsonDataService()
  useControlPanelService()
  useShowBanWeaponService()
  const jsonData = useJsonData()
  const controlPanelEnabled = useControlPanel()
  const showBanWeapon = useShowBanWeapon()
  const setJsonDataCount = useSetRecoilState(coreState.jsonData);
  const setShowBanWeapon = useSetRecoilState(coreState.showBanWeapon);
  const visibility = useVisibility()

  const { left, right } = jsonData

  const { send } = useNuiRequest();

  const [leftLogo, urlLeftInput] = useInput({ type: "url" });
  const [leftScore, leftScoreInput] = useInput({ type: "number" });
  const [leftStar, leftStarInput] = useInput({ type: "number" });
  const [leftWood, leftWoodInput] = useInput({ type: "number" });
  const [leftKnuckle, leftKnuckleInput] = useInput({ type: "number" });
  const [leftKnife, leftKnifeInput] = useInput({ type: "number" });

  const [rightLogo, urlRightInput] = useInput({ type: "url" });
  const [rightScore, rightScoreInput] = useInput({ type: "number" });
  const [rightStar, rightStarInput] = useInput({ type: "number" });
  const [rightWood, rightWoodInput] = useInput({ type: "number" });
  const [rightKnuckle, rightKnuckleInput] = useInput({ type: "number" });
  const [rightKnife, rightKnifeInput] = useInput({ type: "number" });

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
    setShowBanWeapon(true)
    setJsonDataCount({
      left: {
        score: leftScore,
        logo: leftLogo,
        star: leftStar,
        wood: leftWood,
        knuckle: leftKnuckle,
        knife: leftKnife,
      },
      right: {
        score: rightScore,
        logo: rightLogo,
        star: rightStar,
        wood: rightWood,
        knuckle: rightKnuckle,
        knife: rightKnife,
      },
    })
  };

  const closeAll = (e) => {
    e.preventDefault();
    send("Submit", {
      showUi: false,
    })
  };

  const submit = (e) => {
    e.preventDefault();
    send("Submit", {
      showUi: true,
      left: {
        score: leftScore,
        logo: leftLogo,
        star: leftStar,
        wood: leftWood,
        knuckle: leftKnuckle,
        knife: leftKnife,
      },
      right: {
        score: rightScore,
        logo: rightLogo,
        star: rightStar,
        wood: rightWood,
        knuckle: rightKnuckle,
        knife: rightKnife,
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
              <img className="object-scale-down h-20" src={left.logo}/>
            </div>
            {/* Score Left */}
            <div className="flex content-center items-center">
              <h1 style={{ fontSize: 50, color: '#FFF', fontWeight: "bold"}}>{left.score}</h1>
            </div>
          </div>
          {/* Center */}
          <div className="flex flex-col justify-center justify-items-center items-center content-center w-1/2">
            <h1 className="flex justify-center leading-6" style={{ fontSize: 18, fontWeight: 600, color: '#FFF'}}>Crown of King 2021</h1>
            <h1 className="flex justify-center leading-6" style={{ fontSize: 26, fontWeight: "bold", color: '#FFF'}}>Qualifiers</h1>
            <h1 className="flex justify-center leading-6" style={{ fontSize: 18, fontWeight: 600, color: '#FFF'}}>Familie City</h1>
          </div>
          {/* Right */}
          <div className="flex flex-row-reverse justify-around content-center items-center w-1/3">
            {/* Logo Right */}
            <div>
              <img className="object-scale-down h-20" src={right.logo}/>
            </div>
            {/* Score Right */}
            <div>
              <div className="flex content-center items-center">
                <h1 style={{ fontSize: 50, color: '#FFF', fontWeight: "bold"}}>{right.score}</h1>
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
        {/* Weapon Block */}
        {
          showBanWeapon && 
          <>
            <div className="absolute bottom-px left-0 inset-y-1/4">
              <div className="justify-around justify-self-auto flex flex-row pt-2">
                  <img className="h-16 w-16 border-2 rounded-full" src="https://cdn.discordapp.com/attachments/775913267079544842/844893556233863198/BAT2.png"/>
                  <h3 className="flex flex-row font-black text-xl pt-3.5 pl-2 stroke-current text-red-500 text-stroke-2 text-fill-white text-stroke">{left.wood}</h3>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-2">
                  <img className="h-16 w-16 border-2 rounded-full" src="https://cdn.discordapp.com/attachments/775913267079544842/844894004252508180/KNUCKLE2.png"/>
                  <h3 className="font-black text-xl pt-3.5 pl-2 stroke-current text-red-500 text-stroke-2 text-fill-white text-stroke">{left.knuckle}</h3>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-2">
                  <img className="h-16 w-16 border-2 rounded-full" src="https://cdn.discordapp.com/attachments/775913267079544842/844894006198534154/MACHETE2.png"/>
                  <h3 className="font-black text-xl pt-3.5 pl-2 stroke-current text-red-500 text-stroke-2 text-fill-white text-stroke">{left.knife}</h3>
              </div>
            </div>
            <div className="absolute bottom-px right-0 inset-y-1/4">
              <div className="justify-around justify-self-auto flex flex-row pt-2">
                  <h3 className="font-black text-xl pt-3.5 pr-2 stroke-current text-red-500 text-stroke-2 text-fill-white text-stroke">{right.wood}</h3>
                  <img className="h-16 w-16 border-2 rounded-full" src="https://cdn.discordapp.com/attachments/775913267079544842/844893556233863198/BAT2.png"/>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-2">
                  <h3 className="font-black text-xl pt-3.5 pr-2 stroke-current text-red-500 text-stroke-2 text-fill-white text-stroke">{right.knuckle}</h3>
                  <img className="h-16 w-16 border-2 rounded-full" src="https://cdn.discordapp.com/attachments/775913267079544842/844894004252508180/KNUCKLE2.png"/>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-2">
                  <h3 className="font-black text-xl pt-3.5 pr-2 stroke-current text-red-500 text-stroke-2 text-fill-white text-stroke">{right.knife}</h3>
                  <img className="h-16 w-16 border-2 rounded-full" src="https://cdn.discordapp.com/attachments/775913267079544842/844894006198534154/MACHETE2.png"/>
              </div>
            </div>

          </>
        }
        {/* Control Panel */}
        <div style={ controlPanelEnabled ? { visibility: 'visible' } : { visibility: 'hidden' }} className="w-full max-w-md absolute bottom-px box-content p-4 w-1/3 right-40">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="pb-8" style={{ fontWeight: "bold", fontSize: 16 }}>แผงควบคุม</h1>
            <div>
              <label>Url Logo ทีมซ้าย</label>
              {urlLeftInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label>คะแนน ทีมซ้าย</label>
                  {leftScoreInput}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label>ดาว ทีมซ้าย</label>
                  {leftStarInput}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label>แบนไม้ - L</label>
                  {leftWoodInput}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label>แบนสนับ - L</label>
                  {leftKnuckleInput}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label>แบนมีด - L</label>
                  {leftKnifeInput}
                </div>
              </div>
            </div>
            <div>
              <label>Url Logo ทีมขวา</label>
              {urlRightInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label>คะแนน ทีมขวา</label>
                  {rightScoreInput}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label>ดาว ทีมขวา</label>
                  {rightStarInput}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label>แบนไม้ - R</label>
                  {rightWoodInput}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label>แบนสนับ - R</label>
                  {rightKnuckleInput}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label>แบนมีด - R</label>
                  {rightKnifeInput}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around justify-items-center items-center content-center w-full pt-8">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button" onClick={demo}>ตัวอย่าง</button>
              <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="button" onClick={submit}>แสดงทุกคน</button>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded" type="button" onClick={closeAll}>ปิดทุกคน</button>
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" type="button" onClick={() => send("Close", {})}>ปิด</button>
            </div>
            <div className="flex flex-row justify-around justify-items-center items-center content-center w-2/3 pt-8">
              <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="button" onClick={() => send("OpenBanWeapon", {})}>แสดงการแบน</button>
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" type="button" onClick={() => send("CloseBanWeapon", {})}>ปิดการแบน</button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default App;
