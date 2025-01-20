import React from 'react'
// import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { incCartItem, decCartItem } from '../../store/cart-slice';

interface hCardProp{
    id:string;
    name:string;
    price:number;
    img: string;
    quantity:number;
}



const HorizontalCard: React.FC<hCardProp> = ({id,name,price,img,quantity})=>{

   const dispatch = useDispatch()
   
   const increaseQuantity = (productId: string) => {
    dispatch(incCartItem(productId)); // Increment the quantity of the product
  };

    const decreaseQuantity = (productId: string) => {
        dispatch(decCartItem(productId)); // Decrement the quantity of the product
    };
  return (

    <div className='flex flex-row p-4 gap-3 border-2 border-gray-300 rounded-lg sm:w-full'>
        <img src={img} alt="" className='h-24 rounded-md'/>
        <div className='flex flex-col gap-1 justify-between w-full'>
            <div>
                <h2 className='font-medium'>{name}</h2>
                <h3 className='font-medium text-xl'>${price}</h3>
            </div>
            <div className='text-sm font-normal flex flex-row justify-between cs:flex-col cs:gap-4 cs:items-end'>
                <div>Total : ${price*quantity}</div>
                <div>
                    {/* <div> */}
                    <div className='  py-1 flex flex-row justify-center items-center w-fit rounded-full gap-8 bg-custom-gray px-5'>
                        <div className='font-semibold text-2xl cursor-pointer' onClick={()=>decreaseQuantity(id)}>-</div>
                        <div className='text-xl'>{quantity}</div>
                        <div className='font-semibold text-2xl cursor-pointer' onClick={()=>increaseQuantity(id)}>+</div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HorizontalCard;
