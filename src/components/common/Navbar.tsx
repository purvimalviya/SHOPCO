import {useEffect} from 'react'
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cart from '../../assets/cart.png'
import profile from '../../assets/profile.png'
import search from '../../assets/search.png'
import searchsm from '../../assets/searchsm.png'
import burger from '../../assets/burger.png'
import { updateInitial } from '../../store/cart-slice';


const Navbar = ()=> {
  const dispatch = useDispatch();
  const cartCount = useSelector((state: any) => state.cart.cartCount);

  useEffect(()=>{
    const getCartItems = async ()=>{
      try{
        const response = await fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_cartItems.json');
        if(!response.ok){
          throw new Error("Couldn't fetch cart items from db")
        }
        const cartItems = await response.json();
        dispatch(updateInitial(cartItems))
      }catch(err){
        console.log("Error : ", err);
      }
    }
    getCartItems();
  },[dispatch])

  return (
    <div className='flex justify-center'>
      <div className='flex flex-row justify-between items-center w-[88%] gap-[1.5vw] py-4 bg-white'>
        <div className="flex flex-row items-center gap-4">
          <div className="hidden sm:flex"><img src={burger} alt="" /></div>
          <h1 className='text-[2.25vw] font-extrabold sm:text-xl'>SHOP.CO</h1>
        </div>

        <ul className='flex gap-[1.5vw] font-normal text-base sm:hidden'>
            <li> <NavLink to='/'>Shop</NavLink></li>
            <li> <NavLink to='/'>On Sale</NavLink></li>
            <li> <NavLink to='/'>New Arrivals</NavLink></li>
            <li> <NavLink to='/'>Brands</NavLink></li>
        </ul>

        <div className='flex items-center gap-4 bg-custom-gray rounded-full px-4 py-2 w-[42%] sm:hidden'>
            <div className='text-gray-400'><img src={search} alt="" /></div>
            <input type="text" placeholder='Search for products' className='bg-transparent focus:outline-none placeholder:text-gray-400' />
        </div>

        <div className='flex gap-[1.5vw] sm:gap-6'>
            <div><img src={searchsm} alt="" className="hidden sm:flex"/></div>
            <div className='relative cursor-pointer'><Link to="/Cart">
              <img src={cart} alt="" />
              <div className='absolute top-2 left-3 px-2 bg-slate-600 text-white rounded-full'> {cartCount} </div>
            </Link></div>
            <div><img src={profile} alt="" /></div>
        </div>

      </div>
    </div>
  )
}

export default Navbar;

