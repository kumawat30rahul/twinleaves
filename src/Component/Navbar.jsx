import React from 'react'
import { AppBar } from '@mui/material';
import SearchBar from './SearchBar';


function Navbar() {
  return (
    <AppBar
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
            width: "100%",
            backgroundColor: "#f2eded",
        }}
    >
      <SearchBar />
    </AppBar>
  )
}

export default Navbar
