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
        <div>

          <ul>
            <li onClick={() => this.filterChoiceChange("Male")}>Men</li>
            <li onClick={() => this.filterChoiceChange("Female")}>Women</li>
          </ul>
      
          <ul>
            <li onClick={() => this.filterChoiceChange("Outerwear")}>Outerwear</li>
            <li onClick={() => this.filterChoiceChange("Shirt")}>Shirts</li>
            <li onClick={() => this.filterChoiceChange("Pants")}>Pants</li>
            <li onClick={() => this.filterChoiceChange("Shoes")}>Shoes</li>
          </ul>

        </div>
    )
  }
}

export default FilterChoices