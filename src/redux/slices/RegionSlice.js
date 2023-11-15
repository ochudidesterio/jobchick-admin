import { createSlice } from "@reduxjs/toolkit";

const regionInitState ={
    regions:[],
}
const regionsSlice =createSlice({
    name:"regions",
    initialState:regionInitState,
    reducers:{
        setRegions:(state,{payload})=>{
            state.regions = payload
        },
        resetRegions:(state)=>{
            return regionInitState
        }
        
    },
})
export const {setRegions} = regionsSlice.actions
export const {resetRegions} = regionsSlice.actions
export const getRegions  =(state)=>state.regions.regions
export default regionsSlice.reducer