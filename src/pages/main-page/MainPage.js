import React from 'react';
import './MainPage.css';

import MainBar from './components/main-bar/MainBar';
import Portfolio from './components/portfolio/Portfolio';


const MainPage = (props) => {
  const {
    username,
    funds,
    userStocks,
    onHandleStockSelling,
  } = props

  return (
    <div className="">
      <MainBar username={username} funds={funds} userStocks={userStocks} />
      <Portfolio userStocks={userStocks} onHandleStockSelling={onHandleStockSelling}/>
    </div>
  )
}

export default MainPage;
