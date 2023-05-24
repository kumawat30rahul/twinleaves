import React, { useContext } from 'react'
import './styles.css'
import SearchIcon from '@mui/icons-material/Search';
import { ProductData } from '../../App'

function SearchBar() {
  const {setSearchTerm} = useContext(ProductData)

  const searchHandler = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value)
  }

  return (
    <div className='search-wrapper'>
        <input className='search-input' type='text' placeholder='Search Here...' onChange={searchHandler} />
        <SearchIcon className='search-icon'/>
    </div>
  )
}

export default SearchBar
