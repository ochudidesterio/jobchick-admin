import React from 'react'
import {  Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";


const SelectPageSize = ({pageSize,handlePageSizeChange}) => {
  const {t} = useTranslation()
  return (
    <div className="select-box">
          <p>{t('show')}</p>
          <Select
            className="custom-select"
            value={pageSize}
            onChange={handlePageSizeChange}
            variant="outlined"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <p>{t('entries')}</p>
        </div>
  )
}

export default SelectPageSize