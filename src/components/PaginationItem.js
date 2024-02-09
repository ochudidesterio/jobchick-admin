import React from 'react'
import { Pagination} from "@mui/material";
import { useTranslation } from 'react-i18next';


const PaginationItem = ({page,pageCount,handleChange,startIndex,endIndex,entries}) => {
  const {t} = useTranslation()
  return (
    <div  className="pagination">
        <Pagination
        dir='ltr'
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
        <p>
          {t('show')} {startIndex} {t('to')} {endIndex} {t('of')} {entries} {t('entries')}
        </p>
      </div>
  )
}

export default PaginationItem