import React, { useContext } from 'react'
import { ProductData } from '../../App'
import './styles.css'

function Filter() {
  const {productData,setCategoryFilterValue,setSorting} = useContext(ProductData)


  const categories = [...new Set(productData.map(product => product.category_level_1))];

  const categoryFilterHandler = (e) => {
    setCategoryFilterValue(e.target.value)
  }
  const sortingFilterHandler = (e) => {
    console.log(e.target.value);
    setSorting(e.target.value)
  }

  return (
    <div className='filter-wrapper'>
      <h3 className='filter-heading'>Filter</h3>
      <div className='filters'>
        <label htmlFor='category'>Category</label>
        <select className='filter-category-input select' name='category' onChange={categoryFilterHandler}>
            {categories.map((category)=>(
                <option value={category}>{category}</option>
            ))}
        </select>
        <label htmlFor='sort'>Sort</label>
        <select className='filter-sort-input select' name='sort' onChange={sortingFilterHandler}>
            <option value="Original">Original</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
