import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './styles.css'

function Details() {
  const location = useLocation();
  const productData = location.state?.productData;
  
  useEffect(()=>{
    console.log(productData);
  },[productData])

  return (
    <div className='product-detail-wrapper'>
      <div className='prdt-det-image'>
        <img src={productData.images.front} alt='' className='prdt-img'/>
      </div>
      <div className='prdt-det-info'>
        <h1 className='prdt-det-title'>{productData.name.toUpperCase()}</h1>
        <h4 className='prdt-det-price'>₹ {productData.mrp.mrp}</h4>
        <span className='prdt-det-desc'>{productData.description}</span>
        <div className='buttons'>
            <button className='btn addtocart'>Add To Cart</button>
            <button className='btn'>Buy</button>
        </div>
      </div>
    </div>
  )
}

export default Details
