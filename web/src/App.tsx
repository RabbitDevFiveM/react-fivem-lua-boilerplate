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

  const saveData = () => {
    setData(name);
  };

  const onHide = () => {
    setVisibility(false);
  };

  return(
      <div>
        <input value={name} onChange={(event) => setName(event.target.value)}/>
        <br/>
        <button onClick={saveData}>Save</button>
        <button onClick={onHide}>Hide</button>
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
      <button onClick={() => onClick()}>
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
