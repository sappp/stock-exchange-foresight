import React from 'react';
import './MainBar.css';

const MainBar = (props) => {
  const {
    username,
    funds
  } = props

  return (
    <div>
      <div className="MainBar d-flex justify-content-end">
        <div className="Mainbar-username-container mr-auto ">
          <span className="Mainbar-username">{username}</span>
        </div>
        <div className="Mainbar-funds-container">
          <span className="MainBar-funds-label">Your Funds</span>
          <strong className="Mainbar-funds">{funds}</strong>
        </div>
      </div>
      <hr className="Mainbar-line" />
    </div>
  )
}

export default MainBar
