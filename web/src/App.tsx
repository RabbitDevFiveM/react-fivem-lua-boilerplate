import React, { useState } from 'react';
import './App.css';
import "./tailwind.css"

import Slider from './Slider'

import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService, useDataService } from './core/hooks/useCoreService';

import { useData, useJsonData } from './core/hooks/useData';
import { useSetRecoilState, useRecoilValue } from "recoil";
import { coreState, charCountState } from './core/hooks/state';

const DataForm = () => {
  const data = useData()
  const [name, setName] = useState(data);
  const setData = useSetRecoilState(coreState.data);
  const setVisibility = useSetRecoilState(coreState.visibility);

  const saveData = (e) => {
    e.preventDefault();
    setData(name);
  };

  const onHide = (e) => {
    e.preventDefault();
    setVisibility(false);
  };

  return( 
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input value={name} onChange={(event) => setName(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={saveData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          <button onClick={onHide} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Hide</button>
        </div>
      </form>
    </div>
  )
}

function JsonData() {
  const jsonData = useJsonData()
  const setJsonDataCount = useSetRecoilState(coreState.jsonData);

  const onClick = () => {
    setJsonDataCount({
      count: jsonData.count + 1
    })
  }
  
  return (
    <div>
      <p>You clicked {jsonData.count} times</p>
      <button onClick={() => onClick()} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Click me
      </button>
    </div>
  );
}

function App() {
  useCoreService();
  useDataService();
  const visibility = useVisibility()
  const data = useData()
  const jsonData = useJsonData()

  const count = useRecoilValue(charCountState);

  return (
    <div style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
     {/** Any types of components goes here. Maybe some routing? */}
      <h1 style={{ color: 'black'}}>FiveM React Boilerplate</h1>
      <DataForm/>
      <h2>{data}</h2>
      <h2>Character Count: {count}</h2>
      <JsonData/> 
      <h2>JsonData Count: {jsonData.count}</h2>
      <Slider/>
    </div>
  );
}

export default App;
