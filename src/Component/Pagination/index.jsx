import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import './styles.css'
import { useContext } from 'react';
import { ProductData } from '../../App';

export default function PaginationButtons() {

    const {setPaginationValue} = useContext(ProductData)

    const paginationHandler = (e) => {
        console.log(e);
        console.log("page",e.target.innerText, typeof e.target.innerText);
        setPaginationValue(e.target.innerText)
    }

    return (
        <div className='pagination'>
            <Pagination 
                count={10} 
                showFirstButton 
                showLastButton 
                onChange={paginationHandler}
                sx={{
                // "& .Mui-selected":{
                //     backgroundColor:"var(--blue) !important",
                //     color: "white",
                //     borderColor: "var(--blue) !important"
                // },
                // "& .MuiPaginationItem-ellipsis": {
                //     border: "0px solid var(--grey) !important",
                // },
                // "& .MuiPaginationItem-text": {
                //     color: `${darkMode ? 'var(--white)' : 'var(--black)' }`,
                //     border: "1px solid var(--grey)",
                // },
                "@media (max-width: 375px)": {
                    "& .MuiPaginationItem-circular":{
                        height: "20px",
                        minWidth: "20px"
                    }
                }
            }}
            />
        </div>
    )
  }