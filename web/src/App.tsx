import React from 'react';
import './App.css';

// show and hide
import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService } from './core/hooks/useCoreService';

function App() {
  useCoreService();
  const visibility = useVisibility()
  return (
    <div style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
     {/** Any types of components goes here. Maybe some routing? */}
      <h1 style={{ color: 'black'}}>FiveM React Boilerplate</h1>
    </div>
  );
}

export default App;
