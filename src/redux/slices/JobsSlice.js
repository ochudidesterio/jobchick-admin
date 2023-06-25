import { createSlice } from "@reduxjs/toolkit";

const jobsInitState ={
    activejobs:[],
    inactivejobs:[],
    selectedJob:{},
}
const jobsSlice =createSlice({
    name:"jobs",
    initialState:jobsInitState,
    reducers:{
        setActiveJobs:(state,{payload})=>{
            state.activejobs = payload
        },
        setInActiveJobs:(state,{payload})=>{
            state.inactivejobs = payload
        },
        setSelectedJob:(state,{payload})=>{
            state.selectedJob = payload
        }
    },
})
export const {setActiveJobs} = jobsSlice.actions
export const {setInActiveJobs} = jobsSlice.actions
export const {setSelectedJob} = jobsSlice.actions
export const getActiveJobs  =(state)=>state.jobs.activejobs
export const getInActiveJobs  =(state)=>state.jobs.inactivejobs
export const getSelectedJob =(state)=>state.jobs.selectedJob
export default jobsSlice.reducer