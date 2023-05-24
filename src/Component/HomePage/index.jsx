import React from 'react'
import Filter from '../Filter'
import Products from '../DataGrid'

function Home() {
  return (
    <div style={{marginTop: "100px"}}>
      <Filter />
      <Products />
    </div>
  )
}

export default Home
