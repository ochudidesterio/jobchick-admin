import { createSlice } from "@reduxjs/toolkit";

const jobsInitState ={
    activeLikedJobs:[],
    activeUnLikedJobs:[],
    inactivejobs:[],
    selectedJob:{},
    roles:[],
    qualifications:[],
    like:{},
    closedJobs:[],
}
const jobsSlice =createSlice({
    name:"jobs",
    initialState:jobsInitState,
    reducers:{
        setActiveLikedJobs:(state,{payload})=>{
            state.activeLikedJobs = payload
        },
        setActiveUnLikedJobs:(state,{payload})=>{
            state.activeUnLikedJobs = payload
        },
        setInActiveJobs:(state,{payload})=>{
            state.inactivejobs = payload
        },
        setSelectedJob:(state,{payload})=>{
            state.selectedJob = payload
        },
        setRoles:(state,{payload})=>{
            state.roles = payload
        },
        setQualifications:(state,{payload})=>{
            state.qualifications=payload
        },
        setIsLikedJob:(state,{payload})=>{
            state.like = payload
        },
        resetJobs:(state)=>{
            return jobsInitState
        },
        setClosedJobs:(state,{payload})=>{
            state.closedJobs = payload
        }
    },
})
export const {setActiveLikedJobs} = jobsSlice.actions
export const {setActiveUnLikedJobs} = jobsSlice.actions
export const {setInActiveJobs} = jobsSlice.actions
export const {setSelectedJob} = jobsSlice.actions
export const {setQualifications} = jobsSlice.actions
export const {setRoles}=jobsSlice.actions
export const {setIsLikedJob}=jobsSlice.actions
export const {resetJobs} = jobsSlice.actions
export const {setClosedJobs} = jobsSlice.actions
export const getActiveLikedJobs  =(state)=>state.jobs.activeLikedJobs
export const getActiveUnLikedJobs  =(state)=>state.jobs.activeUnLikedJobs
export const getInActiveJobs  =(state)=>state.jobs.inactivejobs
export const getSelectedJob =(state)=>state.jobs.selectedJob
export const getRoles =(state)=>state.jobs.roles
export const getIsLikedJob =(state)=>state.jobs.like
export const getQualifications =(state)=>state.jobs.qualifications
export const getClosedJobs =(state)=>state.jobs.closedJobs
export default jobsSlice.reducer