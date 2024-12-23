// !import React from 'react'
import star_full from '../../assets/star_full.png'
import star_half from '../../assets/star_half.png'

const Stars:React.FC<{rating:number}> = ({rating})=>{
    return (
          <div className='flex flex-row gap-1 items-center text-base text-gray-500'>
  
              {
                  [...Array(Math.floor(rating))].map((_)=>{
                      // return <div>⭐</div>
                      return <img src={star_full} className='w-4 h-4'/>
                  })
              }
  
              {
                  rating % 1 !== 0 && <img src={star_half} className='w-4 h-4'/>
              }
             <div>{rating}/5 </div>
            </div>
          )
}
  
  export default Stars;
  