import {useEffect, useState} from 'react'
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cart from '../../assets/cart.png'
import profile from '../../assets/profile.png'
// import search from '../../assets/search.png'
import searchsm from '../../assets/searchsm.png'
import burger from '../../assets/burger.png'
import { men_category } from '../../lib/constants';
import { women_category } from '../../lib/constants';
import { updateInitial } from '../../store/cart-slice';
import Searchbar from './Searchbar';
import SearchbarSM from './SearchbarSM';
// import Container from './Container';

const Navbar = ()=> {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false)
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); 

  const dispatch = useDispatch();
  const cartCount = useSelector((state: any) => state.cart.cartCount);
  const authUserState = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const authUser = JSON.parse(localStorage.getItem('authUser') || 'null');
        if (!authUser) {
          console.log("No authenticated user found. Cannot fetch user-specific cart. Fetched cart items from localStorage");
          const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          dispatch(updateInitial(storedCartItems))
          return;
        }
  
        const uid = authUser.uid; 
        console.log("Fetching cart items for user:", uid);
  
        const response = await fetch(`https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_cartItems/${uid}.json`);
        if (!response.ok) {
          throw new Error("Couldn't fetch cart items for the user");
        }
        const userCartItems = await response.json();
        console.log("User-specific cart items fetched:", userCartItems);

        dispatch(updateInitial(userCartItems || [])); // Default to an empty array if no items exist
      } catch (err) {
        console.log("Error fetching user-specific cart:", err);
      }
    };
  
    getCartItems();
  }, [authUserState,dispatch]);
  
  const toggleMenu = ()=>{
    setMenuVisibility(!menuVisibility)
  }

  return (
    <div className='flex justify-center '>
      <div className='flex flex-row justify-between items-center w-[88%] gap-[1.5vw] py-4 bg-white relative' onMouseLeave={()=>setDropdownVisible(false)}>
        <div className="flex flex-row items-center gap-4">
          <div className="hidden sm:flex" onClick={toggleMenu}><img src={burger} alt="" /></div>
          <h1 className='text-[2.25vw] font-extrabold sm:text-xl'><Link to='/'>SHOP.CO</Link></h1>

          {/* <Container /> */}

          {
            menuVisibility && (

              <div className='fixed top-0 left-0 w-[70vw] h-[100vh] bg-white p-8 z-50'>
                <ul className='flex flex-col gap-[1.5vw] font-light text-lg'>
                  <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-extrabold  mb-5'><Link to='/'>SHOP.CO</Link></h1>
                    <p className='text-xl font-semibold absolute top-2 right-4' onClick={toggleMenu}>X</p>
                  </div>
                  <li> 
                    <NavLink to='/Shop'>Shop by</NavLink>
                    <div className='ml-5'>
                      <div className='flex flex-col gap-2 mt-2'>
                        <h4 className='font-bold text-blue-900 text-sm cursor-pointer'><Link to="/Shop/Women">Women</Link></h4>
                        {
                          women_category.map((i,_)=>(
                            <p key={_} className='text-lg text-gray-500 font-semibold'><Link to={`/Shop/Women/${i}`}>{i}</Link></p>
                          ))
                        }
                      </div>
                      <div className='flex flex-col gap-2 mt-2'>
                        <h4 className='font-bold text-blue-900 text-sm cursor-pointer'><Link to="/Shop/Men">Men</Link></h4>
                        {
                          men_category.map((i,_)=>(
                            <p key={_} className='text-lg text-gray-500 font-semibold'><Link to={`/Shop/Men/${i}`}>{i}</Link></p>
                          ))
                        }
                      </div>
                    </div>
                  </li>
                  <li> <NavLink to='/#new-arrivals'>New Arrivals</NavLink></li>
                  <li> <NavLink to='/#top-sellers'>Bestsellers</NavLink></li>
                </ul>
              </div>
            )
          }
        </div>

        <ul className='flex gap-[3vw] font-normal text-base sm:hidden relative'>
            <li onMouseEnter={()=>setDropdownVisible(true)} > <NavLink to='/Shop'>Shop by</NavLink></li>
            {
              dropdownVisible && (

                <div className='absolute bg-white top-12  flex flex-row py-10 px-16 gap-20 justify-between z-50 shadow-lg'>
                  <div className='flex flex-col gap-2 w-max'>
                    <h4 className='font-bold text-blue-900 text-sm cursor-pointer'><Link to="/Shop/Women">Women</Link></h4>
                    {
                      women_category.map((i,_)=>(
                        <p key={_} className='text-lg text-gray-500 font-semibold'><Link to={`/Shop/Women/${i}`}>{i}</Link></p>
                      ))
                    }
                  </div>

                  <div className='flex flex-col gap-2 w-max'>
                    <h4 className='font-bold text-blue-900 text-sm'><Link to="/Shop/Men">Men</Link></h4>
                    {
                      men_category.map((i,_)=>(
                        <p key={_} className='text-lg text-gray-500 font-semibold'><Link to={`/Shop/Men/${i}`}>{i}</Link></p>
                      ))
                    }
                  </div>

                </div>
              )
            }
            <li onMouseEnter={()=>setDropdownVisible(false)}> <NavLink to='/#new-arrivals'>New Arrivals</NavLink></li>
            <li onMouseEnter={()=>setDropdownVisible(false)}> <NavLink to='/#top-sellers'>Bestsellers</NavLink></li>
        </ul>

        <Searchbar />


        <div className='flex gap-[1.5vw] sm:gap-6'>
              <img src={searchsm} alt="" className="hidden sm:flex" onClick={()=>setSearchBar(true)}/>
              {
                searchBar && (
                  <SearchbarSM setSearchBar={setSearchBar} />
                )
              }
            

            <div className='relative cursor-pointer'><Link to="/Cart">
              <img src={cart} alt="" />
              <div className='absolute top-2 left-3 px-2 bg-slate-600 text-white rounded-full'> {cartCount} </div>
            </Link></div>
            <div>
              <Link to="/Profile"><img src={profile} alt="" /></Link>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar;

