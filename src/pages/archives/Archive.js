import React,{useState,useEffect} from 'react'
import './archive.css'
import ArchiveCard from './ArchiveCard'
import Person from '../../assets/person.png';
import Jobs from '../../assets/jobs.png';
import Company from '../../assets/company.png';
import api from '../../api/api';



const Archive = () => {
    const[closedJobs,setClosedJobs]= useState([])
    const fetchAllClosedJobs = async() =>{
        try{
          const res = await api.get (`/job/all/closed`)
          setClosedJobs(res.data)
        }catch(err){
          console.log("Error fatching closed jobs: ",err)
    
        }
      }
      useEffect(()=>{
        fetchAllClosedJobs()
      })
    
  return (
    <div className='archives-home' dir='rtl'>
        <h3>Archives</h3>
        <div className='cards-container'>
        <ArchiveCard  title="Jobs"  to='/closedjobs' logo={Jobs} desc="Closed" count={closedJobs.length}/>
        <ArchiveCard title="Users" desc="Deleted" logo={Person}  count={5}/>
        <ArchiveCard title="Companies" logo={Company} desc="Deactivated"  count={10}/>
      </div>
    </div>
  )
}

export default Archive