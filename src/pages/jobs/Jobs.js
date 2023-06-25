import React,{useEffect} from 'react'
import './jobs.css'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import api from '../../api/api'
import { setActiveJobs } from '../../redux/slices/JobsSlice'
import JobsTable from './JobsTable'
const Jobs = () => {
    const dispatch = useDispatch()

    useEffect(()=>{getJobs()})
    const getJobs = async ()=>{
        try{
            const response =await api.get('/job/all/active')
            if(response.status === 200){
                dispatch(setActiveJobs(response.data))
            }
        }catch(error){

        }
    }
  return (
    <div className='jobshome'>
        <h3>Active Jobs</h3>
        <JobsTable/>
    </div>
  )
}

export default Jobs