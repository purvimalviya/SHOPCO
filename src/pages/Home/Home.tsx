// import React from 'react'
import Banner from "../../components/Home/Banner"
import T1 from "../../components/common/T1"
import Card from "../../components/common/Card"
import StylesBox from "../../components/Home/StylesBox"
import Seperator from "../../components/common/Seperator"
import ReviewsScrollable from "../../components/Home/ReviewsScrollable"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Home  = ()=>{

  const brandHighlight : string[] = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'CALVIN KLEIN']

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#new-arrivals') {
      const element = document.getElementById('new-arrivals');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    else if(location.hash === '#top-sellers'){
      const element = document.getElementById('top-sellers');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  interface Product {
    id: string;
    name: string;
    price: number;
    img: string;
    rating: number;
    description?: string;
    colors: string[];
    sizes: string[];
  }

  const [prod,setProd] = useState<Product[]>([]);

  useEffect(()=>{
    const getProd = async ()=>{
      try{
          const response = await fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_products.json')
    
          if(!response.ok){
            throw new Error("Couldnt fetch products")
          }
          const products = await response.json();
          setProd(products);
      }
      catch(err){
          console.log("Error Ocurred : ", err)
      }
    }
    getProd();
  },[])


  return (
    <div>
      {/* Banner */}
      <Banner></Banner>

      {/* Brands Belt */}
      <div className='bg-black text-white flex justify-center'>
        <div className='py-6 flex flex-wrap gap-x-[6vw] gap-y-4 justify-center items-center w-[88%] sm:w-[95%]'>
          { brandHighlight.map((brand)=>{
            return (
            <div className='font-semibold text-5xl sm:text-3xl sm:mx-2'>
              {brand}
            </div>
            )
          })
          }
        </div>
      </div>


      {/* NewArrival */} <div id="new-arrivals"></div>
      <T1 align="center">NEW ARRIVALS</T1>
      <div className="overflow-x-auto  w-full flex justify-center sm:justify-start gap-x-6 scrollbar-hide">
        <div className="w-0 flex-shrink-0 sm:w-[20px]"></div>
        {/* Map cards */}
        {prod.slice(0,4).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            img={item.img}
            rating={item.rating}
          />
        ))}
      </div>

      <Seperator />   

      {/* TopSelling */} <div id="top-sellers"></div>
      <T1 align="center">TOP SELLING</T1>
      <div className="overflow-x-auto  w-full flex justify-center sm:justify-start gap-x-6 scrollbar-hide">
        <div className="w-0 flex-shrink-0 sm:w-[20px]"></div>
        {/* Map cards */}
        {prod.slice(4, 8).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            img={item.img}
            rating={item.rating}
          />
        ))}
      </div>

      {/* Browse by Category Box */}
      <div className='flex justify-center mt-20'>
          <StylesBox/>
      </div>


      {/* Reviews */}
      <ReviewsScrollable></ReviewsScrollable>

      

      {/* //common component also use on product page */}
    </div>
  )
}

export default Home;

