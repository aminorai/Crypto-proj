import React, { useEffect, useRef, useState } from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { coinData } from "./coin-data";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { withTheme } from "@emotion/react";
import { useDemoData } from '@mui/x-data-grid-generator';

const Crypto = () => {
  const defaultCoins = useRef([]);
  const [coins, setCoins] = useState([]);
  const handleChange = (event) => {
    const newCoins = defaultCoins.current.filter(
      (coin) =>
        coin.id.includes(event.target.value) ||
        coin.symbol.includes(event.target.value)
    );
    setCoins(newCoins);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd"
      );
      const data = response.ok ? await response.json() : coinData;
      console.log(data);
      setCoins(data);
      defaultCoins.current = data;
    } catch (err) {
      setCoins(coinData);
      defaultCoins.current = coinData;

      console.log(err);
    }
  };
  useEffect(() => {
    console.log("useEffect");
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);
 
  const columns = [
    { field: "market_cap_rank", headerName: "Rank", width: 10 },
    {
      field: "image",
      headerName: "Symbol Image",
      width: 60,
      renderCell: (params) => <img src={params.value} />,
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "current_price", headerName: "Price", width: 100 },
    { field: "high_24h", headerName: "High_24h", width: 100 },
    { field: "low_24h", headerName: "Low_24h", width: 100 },
    { field: "price_change_24h", headerName: "price-change-24", width: 100 },
    { field: "total_volume", headerName: "total_volume", width: 100 },
    { field: "price_change_percentage_24h", headerName: "Percentage-24", width: 100 },
   
   
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  

  return (
    <div className="ring ring-green-500 rounded-lg  text-white">
      
      {/* <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          className="bg-white rounded-xl"
          style={{ width: "350px" }}
          id="outlined-basic"
          onChange={handleChange}
          label="Outlined"
          variant="outlined"
        ></TextField> */}
      {/* <table  className="border w-full border-red-400" >{coins.map((coin) => (
          <span key={coin.id}>
            <div>{coin.name}</div>
            <div>{coin.symbol}</div>
            <div>{coin.current_price}</div>
          </span>
        ))}</table> */}

      {/* </Box> */}
      <div className="img-header  rounded-lg 	"><h1 className=" text-3xl font-mono font-bold tracking-widest ">Coin Market Cap</h1></div>
      <div style={{ height: 580, width: "100%" }} className="bg-form  opacity-75 font-bold rounded-lg ">
        <DataGrid
         slots={{
          loadingOverlay: LinearProgress,
          toolbar: GridToolbar,
          

        }} 
        sx={{fontFamily:'sans-serif',color:'black'}}  
            
        loading
        {...coins}
          rows={coins}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 10]}  
          checkboxSelection    
        />      
      </div>      
    </div>
  );
};
export default Crypto;
