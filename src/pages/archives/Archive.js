import React from 'react'
import './archive.css'
import ArchiveCard from './ArchiveCard'

const Archive = () => {
    const handleClosedJobs = () => {
        console.log(`Closed Jobs clicked`);
      };
      const handleDeletedUsers = () => {
        console.log(`Deleted users clicked`);
      };
      const handleDeactivatedCompanies = () => {
        console.log(`Deactivated companies clicked`);
      };
  return (
    <div className='archives-home' dir='rtl'>
        <h3>Archives</h3>
        <div className='cards-container'>
        <ArchiveCard  title="Closed Jobs"  to='/home' count={100}/>
        <ArchiveCard title="Deleted Users" onClick={()=>handleDeletedUsers()} count={5}/>
        <ArchiveCard title="Deactivated Companies" onClick={()=>handleDeactivatedCompanies()} count={10}/>
      </div>
    </div>
  )
}

export default Archive