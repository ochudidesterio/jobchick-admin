import { createSlice } from "@reduxjs/toolkit";

const companiesInitState ={
    companies:[],
    selectedCompany:{},
    company:{},
    deactivatedCompanies:[],
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
        },
        setCompany:(state,{payload})=>{
            state.company = payload
        },
        resetCompanies:(state)=>{
            return companiesInitState
        },
        setDeactivatedCompanies:(state,{payload})=>{
            state.deactivatedCompanies = payload
        }
    },
})
export const {setCompanies} = companySlice.actions
export const {setSelectedCompany} = companySlice.actions
export const {setCompany} = companySlice.actions
export const {resetCompanies} = companySlice.actions
export const {setDeactivatedCompanies} = companySlice.actions
export const getCompanies  =(state)=>state.companies.companies
export const getCompany  =(state)=>state.companies.company
export const getSelectedCompany =(state)=>state.companies.selectedCompany
export const getDeactivatedCompanies = (state)=>state.companies.deactivatedCompanies
export default companySlice.reducer