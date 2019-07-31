import React from 'react'

class FilterChoices extends React.Component {
  state = {
    male: false,
    female: false,
    outerwear: false,
    shirt: false,
    pants: false,
    shoes: false
  }

  filterChoiceChange = (choice) => {
    let stateChoice = choice.toLowerCase()
    let checkedFilters = []

    this.setState({
      [stateChoice]: !this.state[stateChoice]
    }, () => {
      for (var key in this.state) {
        let value = this.state[key]
        if (value) {
          checkedFilters.push(key)
        }
      }
      this.props.filterChange(checkedFilters)
    })
    
  }

  render() {
    return (
        <div className="filter-choices-container">

          <h3>Filter</h3>

          <ul>

            <li 
              className={this.state.male ? "filter-active" : null} 
              onClick={() => this.filterChoiceChange("Male")}>
                Men
                </li>

            <li 
              className={this.state.female ? "filter-active" : null}
              onClick={() => this.filterChoiceChange("Female")}>
                Women
                </li>
          </ul>
      
          <ul>

            <li 
              className={this.state.outerwear ? "filter-active" : null}
              onClick={() => this.filterChoiceChange("Outerwear")}>
                Outerwear
                </li>

            <li 
              className={this.state.shirt ? "filter-active" : null}
              onClick={() => this.filterChoiceChange("Shirt")}>
                Shirts
                </li>

            <li 
              className={this.state.pants ? "filter-active" : null}
              onClick={() => this.filterChoiceChange("Pants")}>
                Pants
                </li>

            <li 
              className={this.state.shoes ? "filter-active" : null}
              onClick={() => this.filterChoiceChange("Shoes")}>
                Shoes
                </li>

          </ul>

        </div>
    )
  }
}

export default FilterChoices