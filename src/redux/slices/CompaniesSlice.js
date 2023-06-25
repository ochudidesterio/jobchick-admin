import { createSlice } from "@reduxjs/toolkit";

const companiesInitState ={
    companies:[],
    selectedCompany:{},
}
const companySlice =createSlice({
    name:"companies",
    initialState:companiesInitState,
    reducers:{
        setCompanies:(state,{payload})=>{
            state.companies = payload
        },
        setSelectedCompany:(state,{payload})=>{
            state.selectedCompany = payload
        }
    },
})
export const {setCompanies} = companySlice.actions
export const {setSelectedCompany} = companySlice.actions
export const getCompanies  =(state)=>state.companies.companies
export const getSelectedCompany =(state)=>state.companies.selectedCompany
export default companySlice.reducer