import React from 'react';
import './Portfolio.css';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


const Portfolio = (props) => {
  const {
    userStocks,
    onHandleStockSelling,
  } = props

  const priceFormatter = (cell, row, enumObject, index) => {
     if(!row.trend || row.trend === "=") {
       return <span>{cell}</span>
     } else {
       return <span className={row.trend === "up" ? "Portfolio-currentPrice-trend-up" : "Portfolio-currentPrice-trend-down"}>{cell}</span>
     }
  }

  const sellFormatter = (cell, row, enumObject, index) => {
    return (
      <button onClick={()=> onHandleStockSelling(row.symbol)} className="btn btn-primary">Sell</button>
    )
  }
  const profitLossFormatter = (cell, row, enumObject, index) => {
    const quantity = row.quantity
    const purchased = (row.purchasePrice) * row.quantity
    const currentPrice = (row.currentPrice) * row.quantity
    const diff = (purchased - currentPrice)
    const diffColor = diff >= 0 ? "Portfolio-currentPrice-trend-up" : "Portfolio-currentPrice-trend-down"
    return (
      <span className={diffColor}>{diff.toFixed(5)}</span>
    )
  }


  return (
    <div>
      <BootstrapTable data={userStocks} striped hover version='4'>
        <TableHeaderColumn isKey dataField='symbol' width='10%' headerAlign="center" dataAlign='center'>Stock Symbol</TableHeaderColumn>
        <TableHeaderColumn dataField='quantity' dataSort width='10%' headerAlign="center" dataAlign='center'>Quantity</TableHeaderColumn>
        <TableHeaderColumn dataField='purchasePrice' dataSort width='15%' headerAlign="center" dataAlign='center'>Purchase Price</TableHeaderColumn>
        <TableHeaderColumn dataField='currentPrice' dataSort width='15%' headerAlign="center" dataAlign='center' dataFormat={priceFormatter}>Current Price</TableHeaderColumn>
        <TableHeaderColumn dataField='worth' dataSort width='15%' headerAlign="center" dataAlign='center'>Worth</TableHeaderColumn>
        <TableHeaderColumn dataField='Profit-Loss' dataSort width='20%' headerAlign="center" dataAlign='center' dataFormat={ profitLossFormatter }>Profit / Loss</TableHeaderColumn>
        <TableHeaderColumn dataField='sell' width='10%' dataFormat={ sellFormatter }></TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default Portfolio
