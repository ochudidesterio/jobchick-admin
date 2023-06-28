import { createSlice } from "@reduxjs/toolkit";

const typesInitState ={
    types:[],
}
const typesSlice =createSlice({
    name:"types",
    initialState:typesInitState,
    reducers:{
        setTypes:(state,{payload})=>{
            state.types = payload
        },
        
    },
})
export const {setTypes} = typesSlice.actions
export const getTypes  =(state)=>state.types.types
export default typesSlice.reducer