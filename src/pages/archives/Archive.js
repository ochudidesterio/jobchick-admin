import React,{useState,useEffect} from 'react'
import './archive.css'
import ArchiveCard from './ArchiveCard'
import Person from '../../assets/person.png';
import Jobs from '../../assets/jobs.png';
import Company from '../../assets/company.png';
import api from '../../api/api';



const Archive = () => {
    const[closedJobs,setClosedJobs]= useState([])
    const[deactivatedCompanies,setDeactivatedCompanies] = useState([])
    const[suspendedUsers,setSuspendedUsers] = useState([])
    const fetchAllClosedJobs = async() =>{
        try{
          const res = await api.get (`/job/all/closed`)
          setClosedJobs(res.data)
        }catch(err){
          console.log("Error fatching closed jobs: ",err)
    
        }
      }
      const fetchAllDeactivatedCompanies = async()=>{
        try {
          const res = await api.get(`/company/all/deactivated/page/1/size/1000`)
          if(res.status === 200){
            setDeactivatedCompanies(res.data.data)
          }
        } catch (error) {
          console.log("Error fetching deactivated companies")
        }
      }
      const fetchAllSuspendedUsers = async()=>{
        try {
          const res = await api.get(`/user/all/suspended/page/1/size/1000`)
          if(res.status === 200){
            setSuspendedUsers(res.data.users)
          }
        } catch (error) {
          console.log("Error fetching suspended users")
 
        }
      }
      useEffect(()=>{
        fetchAllClosedJobs()
        fetchAllDeactivatedCompanies()
        fetchAllSuspendedUsers()
      },[])
    
  return (
    <div className='archives-home' dir='rtl'>
        <h3>Archives</h3>
        <div className='cards-container'>
        <ArchiveCard  title="Jobs"  to='/closedjobs' logo={Jobs} desc="Closed" count={closedJobs.length}/>
        <ArchiveCard title="Users" to="/suspended/users" desc="Suspended" logo={Person}  count={suspendedUsers.length}/>
        <ArchiveCard title="Companies" to='/deactivated/companies' logo={Company} desc="Deactivated"  count={deactivatedCompanies.length}/>
      </div>
    </div>
  )
}

export default Archive