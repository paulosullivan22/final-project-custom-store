import React from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import FilterChoices from '../../components/FilterChoices';
import WishlistButton from '../../components/WishlistButton';

class MainStore extends React.Component {
  state = {
    inventory: [],
    originalInventory: []
  }

  searchChange = e => {  // filter from original inventory to provide a full inventory if user deletes search terms 
    const filteredInventory = this.state.originalInventory.filter(
      item => {
        return (item.name.toLowerCase().includes(e.target.value.toLowerCase() ||
        item.gender.toLowerCase() === e.target.value.toLowerCase()))
      }
    )

    this.setState({
      inventory: filteredInventory
    })
  }

  filterChange = (filter) => {

    let inventory = this.state.originalInventory.filter(item=>{
      return filter.includes(item.category.toLowerCase()) 
    })
    
    if (inventory.length === 0) {
      inventory = this.state.originalInventory
    } else if (filter.includes("male")) {
      inventory = inventory.filter(item=>item.gender === "Male") 
    } else if (filter.includes("female")) {
      inventory = inventory.filter(item=>item.gender === "Female")
    } else if (!inventory.length) {
      inventory = this.state.originalInventory
    } else if (filter.includes("male") && filter.includes("female")) {
      inventory = []
    }

    this.setState({
      inventory
    })
  }

  componentDidMount() {
    axios
      .get('/api/store')
      .then(res => {
        this.setState({ 
          // set full inventory to two state items
          // this.state.inventory is mutated by search or filter terms
          // this.state.originalInventory is never mutated and used as a reference 
          // when applying search and filter terms 
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
      <div className="store-body-container">

          <h1>Main Store</h1>

          <hr />

          <FilterChoices 
            inventory={this.state.originalInventory} 
            filterChange={this.filterChange}
            />

          <SearchBar
            searchChange={this.searchChange}
            />

          <div className="store-container">
          {(!this.state.inventory.length) ? // checks if filters or search terms resolves any inventory items, if not, message is displayed
            (<div>There are no items available for your search.</div>) :
            
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
                })}   
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default MainStore;