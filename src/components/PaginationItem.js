import React from 'react'
import { Pagination} from "@mui/material";


const PaginationItem = ({page,pageCount,handleChange,startIndex,endIndex,entries}) => {
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
          Showing {startIndex} to {endIndex} of {entries} entries
        </p>
      </div>
  )
}

export default PaginationItem