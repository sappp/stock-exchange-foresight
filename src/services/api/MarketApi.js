// Market Api.

export const buyStock = (stockSymbol, stockQuantity) => {
  return fetch("http://testing.v2x.foresightauto.com/stock-exchange-service/market/buy", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({stockSymbol, stockQuantity})
    })
    .then(res => {
        return res.json()
    })
}

export const sellStock = (stockSymbol) => {
  return fetch("http://testing.v2x.foresightauto.com/stock-exchange-service/market/sell", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({stockSymbol})
    })
    .then(res => {
        return res.json()
    })
}


export const search = (input) => {
  return fetch("http://testing.v2x.foresightauto.com/stock-exchange-service/market/search", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"searchString": input })
    })
    .then(res => {
        return res.json()
    })
}

export const getStocksBySymbol = (stocks) => {
  return fetch(`http://testing.v2x.foresightauto.com/stock-exchange-service/market?symbol=${stocks}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        return res.json()
    })
}
