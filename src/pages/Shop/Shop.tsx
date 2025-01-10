// import React from 'react'
import { useState, useEffect } from 'react';

import FilterPane from '../../components/Shop/FilterPane';
import ShopCard from '../../components/Shop/ShopCard';
import Pagination from '../../components/Shop/Pagination';


const Shop = () => {
  const [isFilterVisible,setFilterVisible] = useState<boolean>(false);
  const [currentItems,setCurrentItems] = useState<number[]>([]);
  const itemsPerPage  = 3;

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
            setCurrentItems(Array.from({ length: itemsPerPage }, (_, i) => i+1 ));
        }
        catch(err){
            console.log("Error Ocurred : ", err)
        }
      }
      getProd();
    },[])


  return (
    <div className="flex flex-row w-[88%] mx-auto gap-2 justify-between">
      <div className='w-[28%] md:hidden'>
        <FilterPane/>
      </div>

      <div className="md:w-full w-[68%] flex flex-col gap-5">
        {
          isFilterVisible && (
            <div className='absolute z-30 w-[90%]'>
                <FilterPane />
            </div>
          )
        }
        <div className="flex flex-row justify-between">
          <div className="md:flex hidden" onClick={()=>{setFilterVisible(true)}}>X</div>
          <div>xyz-xyz</div>
        </div>

        <div className="flex flex-row flex-wrap gap-6 md:gap-10 lg:gap-6">
          {
            currentItems.length > 0 ? (
              currentItems.map((_) => (
                <ShopCard item={prod[_-1]} />
              ))
            ) : ''
          }
        </div>

        <Pagination totalItems={prod.length} itemsPerPage={itemsPerPage} setCurrentItems={setCurrentItems}/>

      </div>

      
    </div>
  )
}

export default Shop

//otp email verify
//lazy-loading, loader
//breadcrumbs
//category filters
//mailer