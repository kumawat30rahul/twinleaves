import { createContext, useState } from "react"
import Navbar from "./Component/Navbar"
import Home from "./Component/HomePage"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Details from "./Component/ProductDetailPage"

export const ProductData = createContext()

function App() {
  const [productData, setProductData] = useState([])
  const [categoryFilterValue, setCategoryFilterValue] = useState("")
  const [sorting, setSorting] = useState("")
  const [search, setSearchTerm] = useState("")
  const [paginationValue, setPaginationValue] = useState("1")

  return (
    <ProductData.Provider value={{ 
        productData, 
        setProductData, 
        categoryFilterValue, 
        setCategoryFilterValue, 
        sorting, 
        setSorting,
        search,
        setSearchTerm,
        setPaginationValue,
        paginationValue
         }}
      >
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </ProductData.Provider>
  )
}

export default App
