import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

import './StockBuyModal.css';

const StockBuyModal = (props) => {
  const {
    updating,
    openStockBuy,
    selectedStock,
    buyStockQuantity,
    funds,
    onHandleStockBuyModal,
    onHandleUpdateBuyingQuantity,
    onHandleStockBuying,
  } = props

  const processStockDate = (startOf) => {
    let date = new Date(startOf)
    return `${date.getDate()}/${date.getDay()}/${date.getFullYear()}`
  }

  const quantityInputCheck = (e) => {
    if(e.target.value <= 0) {
      console.log(e.target.value)
      e.preventDefault()
    } else {
      onHandleUpdateBuyingQuantity(e.target.value)
    }
  }

  const calcAmount = (qunti, price) => {
    return (qunti * price).toFixed(3)
  }

  const canBuy = (funds, amount) => {
    return funds <= amount
  }

  const {
    name,
    symbol,
    currentPrice,
    startOfCommerce,
  } = selectedStock

  return (
    <Modal isOpen={openStockBuy} toggle={onHandleStockBuyModal} className="">
      <ModalHeader className="StockBuyModal-header-holder" toggle={onHandleStockBuyModal}></ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-around">
          <div className="StockBuyModal-info-holder">
            <div className="StockBuyModal-info-title">Stock</div>
            <strong>{name}</strong>
            <strong className="StockBuyModal-info-symbol"> ({symbol})</strong>
          </div>
          <div className="StockBuyModal-info-holder">
            <div className="StockBuyModal-info-title">Price</div>

            <strong>{currentPrice}</strong>
          </div>
          <div className="StockBuyModal-info-holder">
            <div className="StockBuyModal-info-title">Since</div>
            <strong>{processStockDate(startOfCommerce)}</strong>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-around">
          <div className="">
            <div>
              <span className="StockBuyModal-quantity-label float-left">Quantity</span>
              <Input className="StockBuyModal-quantity-input" onChange={quantityInputCheck} defaultValue={buyStockQuantity} min="1" placeholder="Quantity" type="number" step="1" bsSize="sm" />
            </div>
            <div className="StockBuyModal-amount-holder">
              <span className="StockBuyModal-amount-label">Amount</span>
              <span>{calcAmount(buyStockQuantity, currentPrice)}</span>
            </div>
          </div>
          <div className="">
            <Button
              data-toggle="tooltip"
              title="Not enough funds..."
              data-placement="right"
              disabled={canBuy(funds, calcAmount(buyStockQuantity, currentPrice)) || updating}
              color="primary"
              bsSize="lg"
              onClick={() => onHandleStockBuying(symbol, buyStockQuantity)}>Buy</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default StockBuyModal
