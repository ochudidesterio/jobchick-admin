import { createSlice } from "@reduxjs/toolkit";

const packageInitState ={
    packages:[],
}
const packageSlice =createSlice({
    name:"packages",
    initialState:packageInitState,
    reducers:{
        setPackages:(state,{payload})=>{
            state.packages = payload
        },
        
    },
})
export const {setPackages} = packageSlice.actions
export const getPackages  =(state)=>state.packages.packages
export default packageSlice.reducer