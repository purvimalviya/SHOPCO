// import React from 'react'

const Seperator : React.FC<{className?:string;}> = ({className=''})=>{
  return (
    <div className='flex justify-center my-10'>
        <div className={`${className} w-[86%] bg-custom-gray h-[2px]`}> </div> 
    </div> 
  )
}

export default Seperator;

