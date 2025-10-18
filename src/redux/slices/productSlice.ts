import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { Product , cartItem, historyItem } from "../../models/Models";


type initialState = {
    products: Product[] | null
    cart: cartItem[]
    favorites: Product[]
    sum: number,
    history : historyItem[]

};

const initialState: initialState = {
    products: [],
    cart: [],
    favorites: [],
    sum: 0,
    history : []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    setData: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload     
        }  ,
addToCart: (state, action: PayloadAction<cartItem>) => {
  const foundItem = state.cart.find(item => item.id === action.payload.id);

  if (foundItem) {
    const foundItemSize = foundItem.orderDetails.find(
      detail => detail.size === action.payload.orderDetails[0].size
    );

    if (foundItemSize) {
      foundItemSize.quantity += 1;
    } else {
      foundItem.orderDetails.push({
        quantity: action.payload.orderDetails[0].quantity,
        size: action.payload.orderDetails[0].size,
      });
    }
  } else {
    state.cart.push(action.payload);
  }

  state.sum += action.payload.price * action.payload.orderDetails[0].quantity;

  console.log(`${action.payload.name} added to cart`);
  console.log(JSON.parse(JSON.stringify(state.cart)));
  console.log(state.sum);
},

    clearCart: (state) => {
            state.cart = []
            state.sum = 0
        },
        removeFromCart: (state, action: PayloadAction<cartItem>) => {
            if(action.payload.orderDetails[0].quantity > 1){
               const foundItem = state.cart.find(item => item.id === action.payload.id);
               const foundSize =  foundItem?.orderDetails.find(detail => detail.size === action.payload.orderDetails[0].size)
               
               foundSize!.quantity -= 1;
               state.sum -= action.payload.price;}
               else {
                state.cart = state.cart.filter(item => item.id !== action.payload.id)
                state.sum -= action.payload.price * action.payload.orderDetails[0].quantity
               }

            console.log(JSON.parse(JSON.stringify(state.cart)));
            console.log(state.sum);
                
       
        },
        addToFavorites: (state, action: PayloadAction<Product>) => {
            if(!state.favorites.find(item => item.id === action.payload.id)){
                state.favorites.push({...action.payload , isFavorite: true})}

          
            console.log(JSON.parse(JSON.stringify(state.favorites)));
        
        },
        removeFromFavorites: (state, action: PayloadAction<Product>) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload.id)
            console.log(JSON.parse(JSON.stringify(state.favorites)));
        },
        addToHistory: (state, action: PayloadAction<cartItem[]>) => {
            state.history.push({cart: action.payload , date: new Date().toDateString() , sum: state.sum})
              console.log("history" , JSON.parse(JSON.stringify(state.history)));

        },
        


    },
    



});

export default productSlice.reducer
export const { setData , addToHistory, addToCart , clearCart  , addToFavorites , removeFromFavorites , removeFromCart} = productSlice.actions