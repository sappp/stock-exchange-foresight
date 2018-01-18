import * as portfolioApi from './../services/api/PortfolioApi';
import * as marketApi from './../services/api/MarketApi';
import * as managementApi from './../services/api/ManagementApi';


export const update = (oldState) => {
  return portfolioApi.get()
    .then(res => {
      const username = res.username
      const funds = res.funds
      const userStocks = res.myStocks
      const selectedStockSymbol = (
        oldState.SELECTED_STOCK ? oldState.SELECTED_STOCK.symbol : ""
      )
      const stocksSymbols = (
        userStocks.map(stock => stock.symbol)
                  .reduce((chainSymbols, currentSymbol) => chainSymbols += `${currentSymbol},`, "")
      )

      return Promise.all([
        marketApi.getStocksBySymbol(selectedStockSymbol),
        marketApi.getStocksBySymbol(stocksSymbols)
      ])
      .then((values) => {
        const selectedStock = values[0].stocks.length > 0 ? values[0].stocks[0] : {}
        const updatedStocks = values[1].stocks

        const newUserStocks = _userStocksInfoAdder(oldState.USER_STOCKS, userStocks, updatedStocks)

        return {
          USERNAME: username,
          FUNDS: funds,
          USER_STOCKS: newUserStocks,
          SELECTED_STOCK: selectedStock,
          UPDATING: false,
        }
      });
    })
}

// Return new userStocks array with new information.
const _userStocksInfoAdder = (prevUserStocks, userStocks, updatedStocks) => {
  return userStocks.map(stock => {
    const sym = stock.symbol
    const qunt = stock.quantity

    const thisUpdatedStock = updatedStocks.filter(updatedStock => updatedStock.symbol === sym)[0]

    if(prevUserStocks.length > 0) {
      const thisPervStateStock = prevUserStocks.filter(oldStock => oldStock.symbol === sym)[0]
      if(!thisPervStateStock || !thisPervStateStock.trend) {
        stock.trend = "="
      } else if(thisPervStateStock.currentPrice !== thisUpdatedStock.currentPrice) {
        stock.trend = (thisPervStateStock.currentPrice < thisUpdatedStock.currentPrice) ? "down" : "up"
      }
    }
    stock.currentPrice = thisUpdatedStock.currentPrice
    stock.worth = (qunt * thisUpdatedStock.currentPrice).toFixed(5)
    return stock
  })
}

export const doReset = _ => (state, props) => {
  managementApi.reset()
}

export const doRefresh = (changeTo) => (state, props) => {
  let autoRefresh = state.AUTO_REFRESH
  // do automatic refresh
  if(changeTo) {
    autoRefresh = !autoRefresh
    const intervalAutoRefresh = setInterval(() => {
      console.log("AUTO REFRESH")
      managementApi.refresh()
    }, 5000);

    if(!autoRefresh) {
      console.log("AUTO REFRESH STOPPED")
      clearInterval(intervalAutoRefresh - 1);
      clearInterval(intervalAutoRefresh);
    }
  }
  else {
    managementApi.refresh()
  }

  return {
    AUTO_REFRESH: autoRefresh
  }
}

export const toggleOnUpdate = _ => (state, props) => {
  return {
    UPDATING: !state.UPDATING
  }
}

export const stockSearchInput = (changeTo) => (state, props) => {

  return {
    SEARCH_LOADING: true
  }
}

export const loadStockSearchOptions = (changeTo) => (state, props) => {

  return {
    STOCKS_OPTIONS: changeTo,
    SEARCH_LOADING: false
  }
}

export const openStockBuyModal = (changeTo) => (state, props) => {

  return {
    OPEN_STOCK_BUY: true,
    SELECTED_STOCK: changeTo
  }
}

export const closeStockBuyModal = _ => (state, props) => {

  return {
    OPEN_STOCK_BUY: false,
    BUY_STOCK_QUANTITY: 1,
    SELECTED_STOCK: {}
  }
}

export const updateBuyingQuantity = (changeTo) => (state, props) => {

  return {
    BUY_STOCK_QUANTITY: changeTo,

  }
}
