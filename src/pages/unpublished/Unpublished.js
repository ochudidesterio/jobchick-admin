import React,{useEffect} from 'react'
import "./upublished.css"
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import api from '../../api/api'
import { setInActiveJobs } from '../../redux/slices/JobsSlice'
import UpublishedTable from './UpublishedTable'

const Unpublished = () => {
  const dispatch = useDispatch()
  useEffect(()=>{getInActiveJobs()})
  const getInActiveJobs = async ()=>{
    try {
      const response = await api.get('/job/all/inactive')
      if(response.status === 200){
        dispatch(setInActiveJobs(response.data))
      }
    } catch (error) {
      
    }
  }
  return (
    <div className='unpublished-home'>
      <h3>Unpublished Jobs</h3>
      <UpublishedTable/>
    </div>
  )
}

export default Unpublished