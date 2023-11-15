import { createSlice } from "@reduxjs/toolkit";

const categoryInitState ={
    categories:[],
}
const categorySlice =createSlice({
    name:"categories",
    initialState:categoryInitState,
    reducers:{
        setCategories:(state,{payload})=>{
            state.categories = payload
        },
        resetCategories:(state)=>{
            return categoryInitState
        }
        
    },
})
export const {setCategories} = categorySlice.actions
export const {resetCategories} = categorySlice.actions
export const getCategories  =(state)=>state.categories.categories
export default categorySlice.reducer