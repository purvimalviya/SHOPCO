
import T1 from "../../components/common/T1"
import HorizontalCard from "../../components/Cart/HorizontalCard";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

let initRender:boolean = true;

const Cart  = ()=>{

  interface CartItem{
    id : string;
    name : string;
    price : number;
    quantity : number;
    total : number;
  }
  // geting a list of cart items
  // then the list of products from db
  const cartItems:CartItem[] = useSelector((state: any) => state.cart.cartItems); 

  //then using prod id find that prodct in prod to show img
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
          console.log(products)
          setProd(products);
      }
      catch(err){
          console.log("Error Ocurred : ", err)
      }
    }
    getProd();
    // console.log(prod[0].id)
  },[])

  
  useEffect(()=>{
    const updateCart = async ()=>{
      try{
        const response = await fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_cartItems.json',
          {
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(cartItems)
          });

          if(!response.ok){
            throw new Error("Couldn't update cart on server");
          }
      }catch(err){
        console.log("Error : ", err);
      }
    }
    if(initRender){
      initRender = false;
      return;
    }
    updateCart();
  },[cartItems]) //if prod in cart change , cart will be updated in server
  //but this side effect also runs on initial render, so cart will be updated as default empty, prevent this using initRender true/false


  return (
    <div className="flex flex-col items-center">
      <div className="w-[88%]">

        <T1 align="left">YOUR CART</T1>

        <div className="flex flex-row justify-between gap-5">

          <div className="w-[40%] flex flex-col gap-4 sm:w-[100%]">
            {/* <HorizontalCard id={} name={} price={} img={}></HorizontalCard> */}
            {cartItems.map((cartItem) => {
              // Find the product details by matching the id
              const product = prod.find((item) => item.id === cartItem.id);
              return (
                product && (
                  <HorizontalCard
                    key={cartItem.id}
                    id={cartItem.id}
                    name={product.name}
                    price={product.price}
                    img={product.img}
                    quantity={cartItem.quantity}
                  />
                )
              );
            })}
          </div>

        </div>
      
      
      </div>



    </div>
  )
}

export default Cart;

