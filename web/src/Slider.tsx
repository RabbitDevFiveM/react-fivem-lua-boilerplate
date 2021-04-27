import React, { useState } from 'react';

import ReactSlider from "react-slider"

function Slider() {
	const [value, setValue] = useState(0)
  return (
    <div className="w-full flex justify-center">
      <div className="w-48 border-4 border-red-300">
        <h1 className="text-4xl">Range</h1>
        <label>React Slider</label>
        <ReactSlider
          step={1}
          min={0}
          max={75}
          marks
          markClassName="example-mark"
          className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md cursor-grab"
          thumbClassName="absolute w-5 h-5 cursor-grab bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
          value={value}
          onChange={(value: any) => {
            setValue(value)
          }}
        />
        <span>{value}px</span>
      </div>
    </div>
  );
}

export default Slider;
