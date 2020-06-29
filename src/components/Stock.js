import React from 'react'

const Stock = (props) => {
  
  const handleClick = () => {
    if (!props.owned) {
      props.purchaseStock(props.stock)
    } else {
      props.sellStock(props.stock)
    }
  }

  return (
    <div>
      <div onClick={handleClick} className="card">
        <div className="card-body">
          <h5 className="card-title">{
            props.stock.name
          }</h5>
          <p className="card-text">{
            props.stock.price
          }</p>
        </div>
      </div>
    </div>
  )
}


export default Stock
