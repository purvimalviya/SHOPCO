// import React from 'react'
import T1 from "../common/T1"
import style1 from '../../assets/style1.png'
import style2 from '../../assets/style2.png'
import style3 from '../../assets/style3.png'
import style4 from '../../assets/style4.png'

import style1_ from '../../assets/style1_.png'
import style2_ from '../../assets/style2_.png'
import style3_ from '../../assets/style3_.png'
import style4_ from '../../assets/style4_.png'

const StylesBox = ()=>{
  return (
    <div className='bg-custom-gray w-[86%] rounded-[3vw]'>
        <T1 align="center" className="sm:my-6">BROWSE BY CLOTHING STYLE</T1>
        <div className='flex flex-wrap px-20 sm:px-5 pb-14 gap-6 justify-center'>
          <div className='rounded-2xl'> <img src={style1} alt="Casual" className='h-[18vw] sm:hidden' /></div>
          <div className='rounded-2xl'> <img src={style2} alt="Formal" className='h-[18vw] sm:hidden' /> </div>
          <div className='rounded-2xl'> <img src={style3} alt="Party" className='h-[18vw] sm:hidden' /> </div>
          <div className='rounded-2xl'> <img src={style4} alt="Gym" className='h-[18vw] sm:hidden' /> </div>

          <div className='rounded-2xl'> <img src={style1_} alt="Casual" className='h-56 hidden sm:flex' /></div>
          <div className='rounded-2xl'> <img src={style2_} alt="Formal" className='h-56 hidden sm:flex' /> </div>
          <div className='rounded-2xl'> <img src={style3_} alt="Party" className='h-56 hidden sm:flex' /> </div>
          <div className='rounded-2xl'> <img src={style4_} alt="Gym" className='h-56 hidden sm:flex' /> </div>
        </div>
    </div>
  )
}

export default StylesBox;

