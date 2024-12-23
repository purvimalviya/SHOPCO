import { createSlice } from "@reduxjs/toolkit";

interface Item{
    id : string;
    name : string;
    price : number;
    quantity : number;
    total : number;
}

interface CartState{
    cartCount:number;
    cartItems: Item[];
}

const initialState : CartState = {
    cartCount : 0,
    cartItems : [],
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers : {
        updateInitial : (state, action) =>{
            state.cartItems = action.payload;
            state.cartCount = state.cartItems.length;
        },
        addToCart : (state, action) =>{
            const exists = state.cartItems.some((item)=>item.id===action.payload.id) ;

            if(!exists){
                state.cartItems.push(action.payload);
                state.cartCount++;
            }
        },
        incCartItem : (state, action) =>{
            const index = state.cartItems.findIndex((item)=>item.id===action.payload) ;
            if (index === -1){return}
            const updatedCart = [...state.cartItems];
            updatedCart[index].quantity++;
            updatedCart[index].total+=updatedCart[index].price;

            state.cartItems = [...updatedCart];
        },
        decCartItem : (state, action) =>{
            const index = state.cartItems.findIndex((item)=>item.id===action.payload) ;
            const updatedCart = [...state.cartItems];
            if (index === -1){return}
        
            if(updatedCart[index].quantity===1){
                updatedCart.splice(index,1);
                state.cartCount-=1;
                state.cartItems = [...updatedCart];
                return;
            }
            updatedCart[index].quantity--;
            updatedCart[index].total-=updatedCart[index].price;

            state.cartItems = [...updatedCart];
        },
    }
})

export const {updateInitial, addToCart, incCartItem, decCartItem} = cartSlice.actions;
export default cartSlice.reducer;