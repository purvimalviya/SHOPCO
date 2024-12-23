// !import React from 'react'
import Stars from "./Stars";

const ReviewCard: React.FC<{name:string,text:string,rating:number}> = ({name, text, rating})=>{
  return (
    <div className='w-[25vw] flex-shrink-0 p-6 rounded-xl border-2 sm:w-72'>
        <Stars rating={rating}></Stars>
        <p className='text-lg font-medium'>{name}</p>
        <p className='text-sm text-gray-500 mt-2'>{text}</p>
    </div>
    )
}

export default ReviewCard;
