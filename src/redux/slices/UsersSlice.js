import { createSlice } from "@reduxjs/toolkit";

const usersInitState ={
    users:[],
    admins:[],
    loggedInUser:{},
    selectedAdmin:{},
    selectedUser:{},
    isLoggedIn:false,
}
const usersSlice =createSlice({
    name:"users",
    initialState:usersInitState,
    reducers:{
        setUsers:(state,{payload})=>{
            state.users = payload
        },
        setSelectedUser:(state,{payload})=>{
            state.selectedUser = payload
        },
        setAdmins:(state,{payload})=>{
            state.admins = payload
        },
        setSelectedAdmin:(state,{payload})=>{
            state.selectedAdmin = payload
        },
        setIsLoggedIn:(state,{payload})=>{
            state.isLoggedIn = payload
        },
        setLoggedInUser:(state,{payload})=>{
            state.loggedInUser = payload
        }
    },
})
export const {setUsers} = usersSlice.actions
export const {setSelectedUser} = usersSlice.actions
export const {setAdmins} = usersSlice.actions
export const {setSelectedAdmin} = usersSlice.actions
export const {setIsLoggedIn} = usersSlice.actions
export const {setLoggedInUser} = usersSlice.actions
export const getUsers  =(state)=>state.users.users
export const getSelectedUser =(state)=>state.users.selectedUser
export const getAdmins  =(state)=>state.users.admins
export const getSelectedAdmin =(state)=>state.users.selectedAdmin
export const getIsLoggedIn =(state)=>state.users.isLoggedIn
export const getLoggedInUser =(state)=>state.users.loggedInUser
export default usersSlice.reducer