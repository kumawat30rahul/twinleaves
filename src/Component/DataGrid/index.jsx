import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ProductData } from '../../App'
import LazyLoad from 'react-lazy-load';
import CircularProgress from '@mui/material/CircularProgress'

import './styles.css'
import PaginationButtons from '../Pagination';
import { useNavigate  } from 'react-router-dom';


// cloumns for the data grid
const columns = [
  { field: 'id', headerName: 'ID', width: 50, hide: true },
  {
    field: 'firstName',
    headerName: 'Product',
    flex: 1.2,
    renderCell: (params) => (
      <LazyLoad height={150}>
        <img
          style={{ height: '150px', width: 'auto' }}
          src={params.value}
          alt=""
          className="image"
        />
      </LazyLoad>
    ),
  },
  { field: 'lastName', headerName: 'Name', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'price', headerName: 'Price (rupees)', flex: 1 },
];

function Products() {
  //states===============================================================================
  const [productRows, setProductRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  // usecontext state from App.jsx ========================================================
  const { productData, setProductData, categoryFilterValue, sorting, search, paginationValue } = useContext(ProductData)
  const navigate = useNavigate ()

  //fetching the data========================================================================

  const fetchingProductData = async () => {
    try {
      const response = await fetch(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${paginationValue}`);
      const data = await response.json();
      const products = data.products;

      setProductRows(products);
      setProductData(products)
      setIsLoading(false);
    } catch (error) {
      console.log('This is the error while fetching the data', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchingProductData();
  }, [paginationValue]);

  //category filter ======================================================================================

  useEffect(() => {
    const newProductsData = productData.filter((product) => categoryFilterValue === product.category_level_1)
    setProductRows(newProductsData)
  }, [categoryFilterValue])

  //sorting=================================================================================================

  useEffect(() => {
    if (sorting === "Ascending") {
      const sortedData = productRows.slice().sort((a, b) => a.mrp.mrp - b.mrp.mrp)
      setProductRows(sortedData)
    } else if (sorting === "Descending") {
      const sortedData = productRows.slice().sort((a, b) => b.mrp.mrp - a.mrp.mrp)
      setProductRows(sortedData)
    } else if (sorting === "Original") {
      setProductRows(productData)
    }
  }, [sorting])

  //searching functionality======================================================================================

  useEffect(() => {
    const searchedData = productData.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    console.log("searchedData", searchedData);
    setProductRows(searchedData)
  }, [search])


  //datagrid rows mapped through api data=========================================================================
  const rows = productRows.map((product, index) => {
    return {
      id: index + 1,
      firstName: product.images.front,
      lastName: product.name,
      category: product.category_level_1,
      price: product.mrp.mrp
    };
  });

  //resize of row heights====================================================
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getRowHeight = () => {
    if (windowWidth <= 768) {
      return 150; // Decreased row height for screens with a width of 768 pixels or below
    } else {
      return 250; // Default row height for screens above 768 pixels width
    }
  };

//custom class for rows=========================================================
  const getRowClassName = (params) => {
    return 'custom-row-class';
  };

//navigation to detailed page=============================================================
  const handleRowClick = (params) => {
    const productName  = params.row.lastName;
    const productData = productRows.find((product) => product.name === productName)
    navigate(`/product/${productName}`, {state: {productData }});
  };

  return (
    <div className="data-grid-wrapper-styles" style={{ height: 900, width: '100%', position: "fixed", top: '280px', left: '0', right: '0' }}>
      {isLoading ? (
        <div
          style={{
            height: "70vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          className='loader'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <PaginationButtons />
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            hideHeader
            getRowHeight={getRowHeight}
            getRowClassName={getRowClassName}
            onRowClick={handleRowClick}
          />
        </>
      )}
    </div>
  );
}

export default Products;
