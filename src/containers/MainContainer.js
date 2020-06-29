import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: null,
    currentStocksDisplayed: null,
    portfolio: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(stocks => this.setState({stocks: stocks, currentStocksDisplayed: stocks}))
  }

  purchaseStock = (stock) => {
    this.setState(prevState => ({
      portfolio: [...prevState.portfolio, stock]
    }))
  }

  sellStock = (stock) => {
    this.setState(prevState => ({
      portfolio: prevState.portfolio.filter(eachStock => eachStock !== stock)
    })) 
  }

  compare = (a, b, key) => {
    let comparison = 0;
    if (a[key] > b[key]) {
      comparison = 1;
    } else if (a[key] < b[key]) {
      comparison = -1;
    }
    return comparison;
  }

  filterStock = (filter) => {
    console.log("filtering")
    const filterMap = {
      "alphabetically": () => this.state.stocks.sort((a, b) => this.compare(a, b, "name")),
      "price": () => this.state.stocks.sort((a, b) => this.compare(a, b, "price")),
      "All": () => this.state.stocks,
      "Tech": () => this.state.stocks.filter(stock => stock.type === "Tech"),
      "Sportswear": () => this.state.stocks.filter(stock => stock.type === "Sportswear"),
      "Finance": () => this.state.stocks.filter(stock => stock.type === "Finance") 
    }
    this.setState({
      currentStocksDisplayed: filterMap[filter]()
    })
  } 

  render() {
    if (this.state.stocks === null) return <h1>loading</h1>
    return (
      <div>
        <SearchBar filterStock={this.filterStock}/>
          <div className="row">
            <div className="col-8">
              <StockContainer stocks={this.state.currentStocksDisplayed} purchaseStock={this.purchaseStock}/>
            </div>
            <div className="col-4">
              <PortfolioContainer portfolio={this.state.portfolio} sellStock={this.sellStock}/>
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
