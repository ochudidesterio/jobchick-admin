import React from 'react'
import { Button } from '@mui/material'
import { FileDownload } from "@mui/icons-material";


const ExelButton = ({exportToExel}) => {
  return (
    <Button startIcon={<FileDownload sx={{fontSize: 8,ml: 0.5}} />} onClick={exportToExel} sx={{
        textTransform: 'none'
         }}>Excel</Button>
  )
}

export default ExelButton