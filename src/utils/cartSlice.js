import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const cartSlice = createSlice ({
    name: "cart",
    initialState :{
        items: localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")):[],
        totalQuantity: 0,
        totalAmount: 0,
    }, 
    reducers:{
        addItem:(state, action)=>{
            const itemIndex = state.items.findIndex((item)=> item?.card?.info?.id === action?.payload?.card?.info?.id)
        if(itemIndex >=0){
            state.items[itemIndex].cartQuantity += 1
            toast.info(`${state.items[itemIndex].card.info.name} quauntity was increased in cart`,{
                position: "top-center",theme: "dark"})
       
        }else{
            const tempProduct ={...action.payload, cartQuantity: 1};
            state.items.push(tempProduct)
            toast.success(`${action.payload.card.info.name} was added to cart`,{
                position: "top-center",theme: "dark"
            })
        } localStorage.setItem("items", JSON.stringify(state.items))
        },
        removeItem:(state, action)=>{
            const nextCartState = state.items.filter((item) =>item.card.info.id !== action.payload.card.info.id)
            
            state.items = nextCartState
            
            toast.error(`${action.payload.card.info.name} was removed from cart`,{
            position: "bottom-top",theme: "dark"
        })
        localStorage.setItem("items", JSON.stringify(state.items))
        }, 
        deceraseItemQuantity:(state, action) =>{

            const itemIndex = state.items.findIndex((item)=> item.card.info.id === action.payload.card.info.id)

            if (state.items[itemIndex].cartQuantity > 1) {
                state.items[itemIndex].cartQuantity -= 1 

                toast.info(`${state.items[itemIndex].card.info.name} quauntity was decreased in cart`,{
                    position: "bottom-center",theme: "dark"
                })
                
            } else if (state.items[itemIndex].cartQuantity === 1 ){
                const nextCartState = state.items.filter((item) =>
                    item.card.info.id !== action.payload.card.info.id
                )
                state.items = nextCartState

                toast.error(`${action.payload.card.info.name} was removed from cart`,{
                    position: "bottom-center",theme: "dark"
                })
            }
            localStorage.setItem("items", JSON.stringify(state.items))
        },
        clearCart:(state)=>{
            state.items.length = 0
            localStorage.setItem("items", JSON.stringify(state.items))
        },
        getTotals:(state, action)=>{
            let {total, quantity} = state.items.reduce(
                (cartTotal, item) =>{
     
                 const itemTotal = Math.ceil(item?.card?.info?.price)* item?.cartQuantity
     
                 cartTotal.total += itemTotal
     
                 return cartTotal
                },
                {
                 total: 0,
                 quantity:0
                }
             )
     
             state.totalQuantity = quantity
             state.totalAmount = total
        }
    }
})
export const {addItem, removeItem, clearCart, deceraseItemQuantity, getTotals} = cartSlice.actions
export default cartSlice.reducer