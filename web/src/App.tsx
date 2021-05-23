import React, { useState, useCallback, useEffect } from 'react';
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
    <div style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
     {/** Any types of components goes here. Maybe some routing? */}
      <h1 style={{ color: 'black'}}>FiveM React Boilerplate</h1>
    </div>
  );
}

export default App;
