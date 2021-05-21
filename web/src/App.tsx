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

function useInput({ type, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
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

  const [leftLogo, urlLeftInput] = useInput({ type: "url", defaultValue: "" });
  const [leftScore, leftScoreInput] = useInput({ type: "number", defaultValue: 0 });
  const [leftStar, leftStarInput] = useInput({ type: "number", defaultValue: 0 });
  const [leftWood, leftWoodInput] = useInput({ type: "number", defaultValue: 0 });
  const [leftKnuckle, leftKnuckleInput] = useInput({ type: "number", defaultValue: 0 });
  const [leftKnife, leftKnifeInput] = useInput({ type: "number", defaultValue: 0 });
  const [leftBottle, leftBottleInput] = useInput({ type: "number", defaultValue: 0 });

  const [rightLogo, urlRightInput] = useInput({ type: "url", defaultValue: "" });
  const [rightScore, rightScoreInput] = useInput({ type: "number", defaultValue: 0 });
  const [rightStar, rightStarInput] = useInput({ type: "number", defaultValue: 0 });
  const [rightWood, rightWoodInput] = useInput({ type: "number", defaultValue: 0 });
  const [rightKnuckle, rightKnuckleInput] = useInput({ type: "number", defaultValue: 0 });
  const [rightKnife, rightKnifeInput] = useInput({ type: "number", defaultValue: 0 });
  const [rightBottle, rightBottleInput] = useInput({ type: "number", defaultValue: 0 });

  const [statusShowUI, setStatusShowUI] = useState(false);
  const [statusShowBanWeapon, setStatusShowBanWeapon] = useState(false);

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
        bottle: leftBottle,
      },
      right: {
        score: rightScore,
        logo: rightLogo,
        star: rightStar,
        wood: rightWood,
        knuckle: rightKnuckle,
        knife: rightKnife,
        bottle: rightBottle,
      },
    })
  };

  const openBanWeapon = (e) => {
    setStatusShowBanWeapon(true)
    e.preventDefault();
    send("OpenBanWeapon")
  };

  const closeBanWeapon = (e) => {
    setStatusShowBanWeapon(false)
    e.preventDefault();
    send("CloseBanWeapon")
  };

  const closeAll = (e) => {
    setStatusShowUI(false)
    setStatusShowBanWeapon(false)
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
        wood: leftWood,
        knuckle: leftKnuckle,
        knife: leftKnife,
        bottle: leftBottle,
      },
      right: {
        score: rightScore,
        logo: rightLogo,
        star: rightStar,
        wood: rightWood,
        knuckle: rightKnuckle,
        knife: rightKnife,
        bottle: rightBottle,
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
            <h1 className="flex justify-center leading-6" style={{ fontSize: 26, fontWeight: "bold", color: '#FFF'}}>Qualifiers Day 3</h1>
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
            <div className="absolute bottom-px left-0 inset-y-1/4 mx-3 bg-gradient-to-r from-gray-800 to-black border-2 rounded-3xl h-64 px-1">
              <h1 className="flex justify-center leading-6 mt-4" style={{ fontSize: 18, fontWeight: 600, color: '#FFF'}}>Ban</h1>
              <div className="justify-around justify-self-auto flex flex-row pt-2 p-1">
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260191154831380/aaa4.png"/>
                  <h3 className="text-white text-lg pt-1.5 pl-2">{left.wood > 0 ? left.wood : ''}</h3>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260188927131668/aaa2.png"/>
                  <h3 className="text-white text-lg pt-1.5 pl-2 stroke-current text-re  d-500">{left.knuckle > 0 ? left.knuckle : ''}</h3>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260188356182036/aaa1.png"/>
                  <h3 className="text-white text-lg pt-1.5 pl-2">{left.knife > 0 ? left.knife : ''}</h3>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260189749084180/aaa3.png"/>
                  <h3 className="text-white text-lg pt-1.5 pl-2">{left.bottle > 0 ? left.bottle : ''}</h3>
              </div>
            </div>
            <div className="absolute bottom-px right-0 inset-y-1/4 mx-3 bg-gradient-to-r from-gray-800 to-black border-2 rounded-3xl h-64 px-1">
              <h1 className="flex justify-center leading-6 mt-4" style={{ fontSize: 18, fontWeight: 600, color: '#FFF'}}>Ban</h1>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <h3 className="text-white text-lg pt-1.5 pr-2">{right.wood > 0 ? right.wood : ''}</h3>
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260191154831380/aaa4.png"/>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <h3 className="text-white text-lg pt-1.5 pr-2">{right.knuckle > 0 ? right.knuckle : ''}</h3>
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260188927131668/aaa2.png"/>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <h3 className="text-white text-lg pt-1.5 pr-2">{right.knife > 0 ? right.knife : ''}</h3>
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260188356182036/aaa1.png"/>
              </div>
              <div className="justify-around justify-self-auto flex flex-row pt-1 p-1">
                  <h3 className="text-white text-lg pt-1.5 pr-2">{right.bottle > 0 ? right.bottle : ''}</h3>
                  <img className="h-10 w-10" src="https://cdn.discordapp.com/attachments/737530668061425735/845260189749084180/aaa3.png"/>
              </div>
            </div>

          </>
        }
        {/* Control Panel */}
        <div style={ controlPanelEnabled ? { visibility: 'visible' } : { visibility: 'hidden' }} className="w-full max-w-xl absolute bottom-px box-content p-4 w-2/3 right-40">
          <form className="bg-gradient-to-r from-gray-800 to-black border-2 rounded-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="pb-8 text-white text-lg" style={{ fontWeight: "bold", fontSize: 16 }}>แผงควบคุม</h1>
            <div>
              <label className="text-white text-lg">Url Logo ทีมซ้าย</label>
              {urlLeftInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">คะแนน ทีมซ้าย</label>
                  {leftScoreInput}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">ดาว ทีมซ้าย</label>
                  {leftStarInput}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนไม้</label>
                  {leftWoodInput}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนสนับ</label>
                  {leftKnuckleInput}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนมีด</label>
                  {leftKnifeInput}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนปากฉลาม</label>
                  {leftBottleInput}
                </div>
              </div>
            </div>
            <div>
              <label className="text-white text-lg">Url Logo ทีมขวา</label>
              {urlRightInput}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">คะแนน ทีมขวา</label>
                  {rightScoreInput}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">ดาว ทีมขวา</label>
                  {rightStarInput}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนไม้</label>
                  {rightWoodInput}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนสนับ</label>
                  {rightKnuckleInput}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนมีด</label>
                  {rightKnifeInput}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="text-white text-lg">แบนปากฉลาม</label>
                  {rightBottleInput}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around justify-items-center items-center content-center w-full pt-8">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button" onClick={demo}>ตัวอย่าง</button>
              {/* <div className={`banner ${active ? "active" : ""}`}>{children}</div> */}
              <button className={`bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded ${statusShowUI && "ring ring-green-200"}`} type="button" onClick={submit}>แสดงทุกคน</button>
              <button className={`bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded ${!statusShowUI && "ring ring-yellow-200"}`} type="button" onClick={closeAll}>ปิดทุกคน</button>
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" type="button" onClick={() => send("Close", {})}>ปิด</button>
            </div>
            <div className="flex flex-row justify-around justify-items-center items-center content-center w-full pt-8">
              <button className={`bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-600 rounded ${statusShowBanWeapon && "ring ring-green-300"}`} type="button" onClick={openBanWeapon}>แสดงการแบนทุกคน</button>
              <button className={`bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-red-400 rounded ${!statusShowBanWeapon && "ring ring-red-300"}`} type="button" onClick={closeBanWeapon}>ปิดแสดงการแบนทุกคน</button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default App;
