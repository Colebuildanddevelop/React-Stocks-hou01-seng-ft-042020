import React from 'react';

class SearchBar extends React.Component {

  state = {
    alphabetically: false,
    price: false
  }
  
  handleClick = (filter) => {
    if (this.state[filter]) {
      console.log("unchecking")
      this.props.filterStock("All")
    } else {
      this.props.filterStock(filter)
    }
    this.setState({
      [filter]: !this.state[filter]
    })
  }

  render() {

    return (
      <div>
        <strong>Sort by:</strong>
        <label>
          <input type="radio" value="Alphabetically" checked={this.state.alphabetically} onClick={() => this.handleClick("alphabetically")}/>
          Alphabetically
        </label>
        <label>
          <input type="radio" value="Price" checked={this.state.price} onClick={() => this.handleClick("price")}/>
          Price
        </label>
        <br/>
  
        <label>
          <strong>Filter:</strong>
          <select onChange={(e) => this.props.filterStock(e.target.value)}>
            <option value="All">All</option>
            <option value="Tech">Tech</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Finance">Finance</option>
          </select>
        </label>
      </div>
    );
  }
}


export default SearchBar;
