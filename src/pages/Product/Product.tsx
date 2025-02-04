import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, incCartItem, decCartItem } from '../../store/cart-slice';
import T1 from '../../components/common/T1';
import Stars from '../../components/common/Stars';
import RoundButton from '../../components/common/RoundButton';
import Spinner from '../../components/common/Spinner';

let initRender: boolean = true;

const Product: React.FC = () => {
  const location = useLocation();
  console.log(location.pathname);

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const [prodItem, setProdItem] = useState({
    id: '',
    name: '',
    price: 0,
    img: '',
    rating: 0,
    description: '',
    colors: [],
    sizes: [],
  });
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const add = () => {
    console.log('added');
    dispatch(addToCart({ id: prodItem.id, title: prodItem.name, price: prodItem.price, quantity: 1, total: prodItem.price }));
  };

  const getProductCount = (productId: string) => {
    const product = cartItems.find((item: any) => item.id === productId);
    return product ? product.quantity : 0;
  };

  const increaseQuantity = (productId: string) => {
    dispatch(incCartItem(productId)); // Increment the quantity of the product
  };

  const decreaseQuantity = (productId: string) => {
    dispatch(decCartItem(productId)); // Decrement the quantity of the product
  };

  useEffect(() => {
    const getProd = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_products.json');

        if (!response.ok) {
          throw new Error('Couldn\'t fetch products');
        }

        const products = await response.json();
        console.log(products);
        console.log(id);
        const item = products.find((_: any) => _.id === id);
        console.log(item);

        if (item) {
          setProdItem(item);
        }
      } catch (err) {
        console.log('Error occurred:', err);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };
    getProd();
  }, [id]);

   useEffect(() => {
      const updateCart = async () => {
        try {
          const authUser = JSON.parse(localStorage.getItem('authUser') || 'null');
    
          if (!authUser) {
            console.log("No authenticated user found. Cart updated locally.");
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return;
          }
    
          const uid = authUser.uid; 
          const response = await fetch(
            `https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_cartItems/${uid}.json`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(cartItems), // Store the cart items under the user's UID
            }
          );
    
          if (!response.ok) {
            throw new Error("Couldn't update cart on server");
          }
    
          console.log(`Cart successfully updated for user: ${uid}`);
        } catch (err) {
          console.log("Error updating cart:", err);
        }
      };
    
      if (initRender) {
        initRender = false; 
        return;
      }
    
      updateCart();
    }, [cartItems]);
  //using this useffect wherever cart is update using dispatch (more explanation in cart.tsx)
  //if prod in cart change , cart will be updated in server
  //but this side effect also runs on initial render, so cart will be updated as default empty, prevent this using initRender true/false

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='w-[88%] bg-custom-gray h-[2px] mb-10'> </div> 

        {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
        ) : (
        <div className='w-[88%] flex flex-row justify-center gap-6 sm:flex-wrap'>

          <div className='w-[600px] flex flex-row gap-4 justify-between h-[500px] sm:flex-col sm:justify-start sm:h-auto'>
            <div className='flex flex-col justify-between sm:hidden'>
              <img src={prodItem?.img} alt="" className='h-[32%]'/>
              <img src={prodItem?.img} alt="" className='h-[32%]'/>
              <img src={prodItem?.img} alt="" className='h-[32%]'/>
              
            </div>

            <div>
              <img src={prodItem?.img} alt="" className='h-full sm:w-full'/>
            </div>

            <div className='flex-row justify-between hidden sm:flex'>
              <img src={prodItem?.img} alt="" className='w-[32%]'/>
              <img src={prodItem?.img} alt="" className='w-[32%]'/>
              <img src={prodItem?.img} alt="" className='w-[32%]'/>
              
            </div>
          </div>

          <div className='w-auto flex flex-col gap-4 sm:mt-4'>
              <T1 align='left' className='!mt-0 !mb-0 leading-none'>{prodItem.name}</T1>
              <Stars rating={prodItem.rating}></Stars>
              <p className='font-semibold text-3xl'>${prodItem.price}</p>
              <p className='text-gray-600'>{prodItem.description}</p>

              <div className='w-[95%] bg-custom-gray h-[1.75px] '> </div> 
              <p className='text-gray-600 text-sm'>Select Colour</p>
              <div className='flex flex-row gap-4'>
                {
                  prodItem.colors.map((_,i)=>
                    <div key={i} className='rounded-full w-7 h-7 border-2 border-neutral-500' style={{ backgroundColor: _ }}></div>
                  )
                }
              </div>


              <div className='w-[95%] bg-custom-gray h-[1.75px] '> </div> 
              <p className='text-gray-600 text-sm'>Select Size</p>
              <div className='flex flex-row gap-4'>
                {
                  prodItem.sizes.map((_,i)=>
                    <RoundButton key={i} className='!text-gray-700 !bg-custom-gray' text={`${_}`} width={'auto'}></RoundButton>
                  )
                }
              </div>


              <div className='w-[95%] bg-custom-gray h-[1.75px] '> </div> 
              <div className='flex flex-row gap-10'>
                {
                  getProductCount(prodItem.id)>0 && (
                    <div className='flex flex-row justify-center items-center w-auto rounded-full gap-8 bg-custom-gray px-5 cs:gap-4'>
                      <div className='font-semibold text-2xl cursor-pointer cs:text-lg' onClick={()=>decreaseQuantity(prodItem.id)}>-</div>
                      <div className='text-xl cs:text-base'>{getProductCount(prodItem.id)}</div>
                      <div className='font-semibold text-2xl cursor-pointer cs:text-lg' onClick={()=>increaseQuantity(prodItem.id)}>+</div>
                   </div>
                  )
                }

                <RoundButton text="Add to Cart" width={'fit'} padding={10} onClick={add}></RoundButton>
              </div>


          </div>

                
        </div>

              )}
    </div> 
  )
}

export default Product;
