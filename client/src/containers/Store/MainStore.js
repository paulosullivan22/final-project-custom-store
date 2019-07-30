import React from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar'
import FilterChoices from '../../components/FilterChoices'
import WishlistButton from '../../components/WishlistButton'

class MainStore extends React.Component {
  state = {
    inventory: [],
    originalInventory: []
  }

  searchChange = e => {
    console.log(this.state.inventory)
    const filteredInventory = this.state.originalInventory.filter(
      item => item.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    this.setState({
      inventory: filteredInventory
    })
  }

  filterChange = (filter) => {
    console.log(filter)

    let inventory = this.state.originalInventory.filter(item=>{
      return filter.includes(item.category.toLowerCase()) ||
            filter.includes(item.gender.toLowerCase())
    })
    console.log(inventory)
    if (!inventory.length) inventory = this.state.originalInventory
    this.setState({
      inventory
    })
    
  }

  componentDidMount() {
    console.log(this.props)
    console.log(this.props.user)

    axios
      .get('/api/store')
      .then(res => {
        this.setState({
          inventory: res.data,
          originalInventory: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {

    return (
      <div>
          <SearchBar searchChange={this.searchChange}/>

          <FilterChoices 
            inventory={this.state.originalInventory} 
            filterChange={this.filterChange}
            />

          <div className="store-container">
          {(!this.state.inventory.length) ? 
            (<div>Loading</div>) :
            
            (<div className="item-container">
            {this.state.inventory.map(item => {
              return (
                  <div className="item-card" key={item._id}>
                    <p>{item.name}</p>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onMouseOver={e => (e.currentTarget.src=`${item.image2}`)}
                      onMouseOut={e => (e.currentTarget.src=`${item.image}`)}
                      />
                    <div className="item-content">
                        <p>{item.category}</p>
                        <span>|</span>
                        <WishlistButton 
                          item={item}
                          user={this.props.user}
                          setUser={this.props.setUser}
                          />
                      </div>
                  </div>
              )
            })
          }</div>)
          
        }</div>

      </div>
    )
  }
}

export default MainStore;