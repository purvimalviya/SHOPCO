// import React from 'react'
// import { useState } from "react";

interface RoundButtonProps{
    text : string;
    padding?: number;
    width : 'auto' | 'full' | 'fit' | string;
    // width : string; //auto/full
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const RoundButton = ({text, padding=5, width, className, onClick}:RoundButtonProps)=>{

  return (
    <div onClick={onClick} className={`${className} bg-black text-white py-3 w-${width} rounded-full text-center cursor-pointer text-[1vw] sm:text-lg cs:text-sm`}
        style={{ paddingLeft: `${padding}%`, paddingRight: `${padding}%` }} >
      {text}
    </div>
  )
}

export default RoundButton;

