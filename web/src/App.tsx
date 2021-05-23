import React, { useCallback, useEffect } from 'react';
import './App.css';

// show and hide
import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService } from './core/hooks/useCoreService';

// NUI
import { useNuiRequest } from "fivem-nui-react-lib";

function App() {
  useCoreService();
  const visibility = useVisibility()
  const { send } = useNuiRequest();

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

  
  return (
    <div className="container w-full max-w-screen-md mx-auto pt-8 justify-center justify-self-auto" style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
      <div className="box-content justify-center justify-self-auto h-12 w-full p-4 border-2 rounded-3xl flex justify-between bg-gradient-to-r from-gray-800 to-black">
        <h1 className="text-white">FiveM React Boilerplate</h1>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button">Example</button>
      </div>
    </div>
  );
}

export default App;
