import React, { useState } from 'react';
import './App.css';
import "./tailwind.css"

import { useVisibility } from './core/hooks/useVisibility';
import { useCoreService } from './core/hooks/useCoreService';

import { useRecoilValue } from "recoil";

function App() {
  useCoreService()
  const visibility = useVisibility()

  return (
    <div style={ visibility ? { visibility: 'visible' } : { visibility: 'hidden' }}>
      <div className="container mx-auto">
        <div className="md:container md:mx-auto">
          <div className="box-content h-32 w-full p-4 border-2 rounded-3xl flex justify-between bg-gradient-to-r from-white to-black">
            {/* Left */}
            <div className="flex justify-around content-center items-center w-1/3">
              {/* Logo Left */}
              <div>
                <img className="object-scale-down h-20" src="https://cdn.discordapp.com/attachments/775913267079544842/843907068200353842/DRAGON.png"/>
              </div>
              {/* Score Left */}
              <div className="flex content-center items-center">
                <h1 style={{ fontSize: 50, color: 'black', fontWeight: "bold"}}>0</h1>
              </div>
            </div>
            {/* Center */}
            <div className="flex flex-col justify-center justify-items-center items-center content-center w-1/2">
              <h1 className="flex justify-center leading-6" style={{ fontSize: 19, fontWeight: 600, color: '#FFF'}}>Crown of King 2021</h1>
              <h1 className="flex justify-center leading-6" style={{ fontSize: 24, fontWeight: "bold", color: '#FFF'}}>Qualifiers</h1>
              <h1 className="flex justify-center leading-6" style={{ fontSize: 16, fontWeight: 600, color: '#FFF'}}>Familie City</h1>
            </div>
            {/* Right */}
            <div className="flex flex-row-reverse justify-around content-center items-center w-1/3">
              {/* Logo Right */}
              <div>
                <img className="object-scale-down h-20" src="https://cdn.discordapp.com/attachments/775913267079544842/843907074874408990/JAK.png"/>
              </div>
              {/* Score Right */}
              <div>
                <div className="flex content-center items-center">
                  <h1 style={{ fontSize: 50, color: '#FFF', fontWeight: "bold"}}>0</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row box-content px-4 h-6 w-full rounded-3xl flex justify-between">
            <div className="flex w-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="flex w-1/2 justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          {/* <img src="https://i.pinimg.com/564x/e6/1a/4e/e61a4e31569a4431b18ce6f8a8216f39.jpg"/> */}
        </div>
      </div>
    </div>
  );
}

export default App;
