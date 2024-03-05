import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { coinData } from "./coin-data";
import { DataGrid } from '@mui/x-data-grid';
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
  }, []);
  const columns=[
    { field: 'image', headerName: '', width: 40,renderCell: (params) => <img src={params.value} />},
    { field: 'id', headerName: 'ID', width: 100  },
  { field: 'name', headerName: 'name', width: 100 },
  { field: 'current_price', headerName: 'price', width: 100 },
  { field: 'high_24h', headerName: 'high_24h', width: 100 },
  
  
  ]

  return (
    <div >
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
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
      className="bg-white opacity-60"
        rows={coins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
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
