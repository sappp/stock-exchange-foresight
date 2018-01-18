import React from 'react';
import './Header.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import StockBuyModal from './components/stock-buy-modal/StockBuyModal'


const Header = (props) => {
  const {
    updating,
    searchLoading,
    stocksOptions,
    openStockBuy,
    selectedStock,
    buyStockQuantity,
    funds,
    userStocks,
    autoRefresh,
    onHandleStockBuyModal,
    onHandleStockSearch,
    onHandleUpdateBuyingQuantity,
    onHandleStockBuying,
    onHandleDoRefresh,
    onHandleReset,
  } = props

  const filterOptions = (options, userStocks) => {
    return options.filter(thisStock => {
       let keepIn = true
       userStocks.forEach(stock => {
         if(thisStock.symbol === stock.symbol) {
           keepIn = false
         }
       })
       if(keepIn) {
          return thisStock
       }
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
      <div className="Header-brand">
        <a className="navbar-brand" href="#">Foresight Stock Exchange</a>
      </div>
      <div className="p-0">
        <div className="Header-select-holder">
          <Select
            className="Header-select-holder"
            name="form-field-name"
            matchProp={""}
            valueKey="name"
            labelKey="name"
            isLoading={searchLoading}
            onInputChange={onHandleStockSearch}
            onChange={(newValue) => {
              onHandleStockBuyModal(newValue)
            }}
            options={filterOptions(stocksOptions, userStocks)}
          />
        </div>
        <StockBuyModal
          updating={updating}
          openStockBuy={openStockBuy}
          selectedStock={selectedStock}
          buyStockQuantity={buyStockQuantity}
          funds={funds}
          onHandleStockBuyModal={onHandleStockBuyModal}
          onHandleUpdateBuyingQuantity={onHandleUpdateBuyingQuantity}
          onHandleStockBuying={onHandleStockBuying}
        />
      </div>
      <div className="p-0 ml-auto">
        <button
          data-toggle="tooltip"
          title="Trigger update each 5 second automaticly."
          data-placement="bottom"
          className={`Header-button btn ${autoRefresh ? "btn-outline-success" : "btn-outline-secondary"}`}
          onClick={() => onHandleDoRefresh(true)}
        >
          AUTO REFRESH
        </button>
        <button className="Header-button btn btn-outline-info" disabled={autoRefresh} onClick={() => onHandleDoRefresh(false)}>FORCE REFRESH</button>
        <button className="Header-button btn btn-outline-danger" onClick={onHandleReset} >RESET</button>
      </div>
    </nav>
  )
}

export default Header;
