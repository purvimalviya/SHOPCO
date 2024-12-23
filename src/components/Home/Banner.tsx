// import React from 'react'
import hero from '../../assets/hero_img.png'
import RoundButton from '../common/RoundButton';

const Banner = ()=>{

    interface statType{
      title:string;
      subtitle:string;
    }

    const stats : statType[]  = [
        {title: '200+', subtitle: 'International Brands'},
        {title: '2,000+', subtitle: 'High-Quality Products'},
        {title: '30,000+', subtitle: 'Happy Customers'},
    ]    
  return (
    <div className='flex bg-custom-gray sm:flex-wrap'>
      <div className='w-1/2 flex flex-col gap-[2.5vw] justify-center items-start p-24 pr-[3.5vw] pb-[1vw] sm:w-full sm:p-8'>
        <h2 className='font-black text-[4.2vw] leading-none sm:text-5xl'>
            FIND CLOTHES THAT MATCH YOUR STYLE
        </h2>
        <p className='text-gray-600'>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>

        {/* RoundButton */}
        <RoundButton text="Shop Now" padding={10} width="auto sm:w-full"/>

        <div className='flex flex-row gap-x-[1.5vw] mt-4 sm:gap-x-14 sm:flex-wrap sm:justify-center'>
            {
                stats.map((item)=>{
                    return (
                        <div className='sm:w-32'>
                            <h3 className='font-semibold text-4xl'>{item.title}</h3>
                            <p className='text-gray-500'>{item.subtitle}</p>
                        </div>
                    )
                })
            }
        </div>
      </div>
      <div className='w-[40%] flex justify-center relative sm:w-full'>
        <img src={hero} alt="" className="absolute bottom-0 right-0 sm:relative"/>
      </div>
    </div>
  )
}

export default Banner;

