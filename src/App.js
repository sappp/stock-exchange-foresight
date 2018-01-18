import React, { Component } from 'react';
import './App.css';

import Header from './layout/header/Header';
import MainPage from './pages/main-page/MainPage';

import * as marketApi from './services/api/MarketApi';
import * as actions from './actions/Actions';


class App extends Component {
  constructor() {
    super();
    this.state = {
      USERNAME: "",
      FUNDS: "",
      USER_STOCKS: [],
      SEARCH_LOADING: false,
      STOCKS_OPTIONS: [],
      OPEN_STOCK_BUY: false,
      SELECTED_STOCK: {},
      BUY_STOCK_QUANTITY: 1,
      AUTO_REFRESH: false,
      UPDATING: false,
    };
    this.actions = actions
    this.handleUserStocksUpdate = this.handleUserStocksUpdate.bind(this);
    this.handleStockSearch = this.handleStockSearch.bind(this);
    this.handleStockBuyModal = this.handleStockBuyModal.bind(this);
    this.handleUpdateBuyingQuantity = this.handleUpdateBuyingQuantity.bind(this);
    this.handleStockBuying = this.handleStockBuying.bind(this)
    this.handleStockSelling = this.handleStockSelling.bind(this)
    this.handleDoRefresh = this.handleDoRefresh.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.handleUserStocksUpdate()
    const interval = setInterval(() => {
      console.log("APP UPDATE")
      this.handleUserStocksUpdate()
    }, 5000);
  }

  async handleUserStocksUpdate() {
    this.setState(this.actions.toggleOnUpdate())
    const newState = await this.actions.update(this.state)
    this.setState((state, props) => {
      return newState
    })
  }

  handleDoRefresh(automaticly) {
    this.setState(this.actions.doRefresh(automaticly))
  }

  handleReset() {
    this.actions.managementApi.doReset()
  }

  handleStockSelling(stockSymbol) {
    marketApi.sellStock(stockSymbol)
    .then(res => {
      if(res.funds) {
        // this.setState(this.actions.closeStockBuyModal())
        this.handleUserStocksUpdate()
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleStockBuying(stockSymbol, qunti) {
    marketApi.buyStock(stockSymbol, qunti)
    .then(res => {
      if(res.funds) {
        this.setState(this.actions.closeStockBuyModal())
        this.handleUserStocksUpdate()
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleStockBuyModal(selectedStock) {
    if(this.state.OPEN_STOCK_BUY) {
      this.setState(this.actions.closeStockBuyModal())
    } else {
      this.setState(this.actions.openStockBuyModal(selectedStock))
    }
  }

  handleUpdateBuyingQuantity(qunti) {
    this.setState(actions.updateBuyingQuantity(qunti))
  }

  handleStockSearch(changeTo) {
    if(changeTo === "") {
      return
    }
    this.setState(this.actions.stockSearchInput(changeTo))
    marketApi.search(changeTo)
    .then(res => {
        this.setState(this.actions.loadStockSearchOptions(res.stocks))
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const {
      USERNAME,
      FUNDS,
      USER_STOCKS,
      SEARCH_LOADING,
      STOCKS_OPTIONS,
      OPEN_STOCK_BUY,
      SELECTED_STOCK,
      BUY_STOCK_QUANTITY,
      AUTO_REFRESH,
      UPDATING,
    } = this.state;
    console.log(this.state)
    return (
      <div className="App">
        <Header
          updating={UPDATING}
          searchLoading={SEARCH_LOADING}
          stocksOptions={STOCKS_OPTIONS}
          openStockBuy={OPEN_STOCK_BUY}
          buyStockQuantity={BUY_STOCK_QUANTITY}
          selectedStock={SELECTED_STOCK}
          funds={FUNDS}
          userStocks={USER_STOCKS}
          autoRefresh={AUTO_REFRESH}
          onHandleUpdateBuyingQuantity={this.handleUpdateBuyingQuantity}
          onHandleStockSearch={this.handleStockSearch}
          onHandleStockBuyModal={this.handleStockBuyModal}
          onHandleStockBuying={this.handleStockBuying}
          onHandleDoRefresh={this.handleDoRefresh}
          onHandleReset={this.onHandleReset}
        />

        <div className="container">
          <div className="row">
            <div className="col-12">
              <MainPage
                username={USERNAME}
                funds={FUNDS}
                userStocks={USER_STOCKS}
                onHandleStockSelling={this.handleStockSelling}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
