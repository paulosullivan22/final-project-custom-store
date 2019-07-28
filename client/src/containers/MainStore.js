import React from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar'
import FilterChoices from '../components/FilterChoices'

class MainStore extends React.Component {
  state = {
    inventory: [],
    originalInventory: []
  }

  searchChange = e => {
    const filteredInventory = this.state.originalInventory.filter(
      item => item.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    this.setState({
      inventory: filteredInventory
    })
  }

  filterChange = (filter) => {
    console.log(filter)


    // const filteredInventory = this.state.originalInventory.filter(
    //   item => {
  
    //   }
    // )

    // console.log(filteredInventory)

    // const filteredInventory = this.state.originalInventory.filter(
    //   item => {
    //     return (filterType === 'gender') ?
    //         item.gender === filter :
    //         item.type === filter
    //   }
    // )

    // this.setState({
    //   inventory: filteredInventory
    // })
    
  }

  componentDidMount() {
    console.log(this.props.user)

    axios
      .get('/api/inventory')
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

          {(!this.state.inventory.length) ? 
            <div>Loading</div> :

            this.state.inventory.map(item => {
              return (
                  <div key={item._id}>
                    <h2>{item.name}</h2>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      height="300px"
                      onMouseOver={e => (e.currentTarget.src=`${item.image2}`)}
                      onMouseOut={e => (e.currentTarget.src=`${item.image}`)}
                      />
                    <p>{item.type}</p>
                    <button onClick={() => {
                      this.props.user.wishlist.push(item)
                      console.log(this.props.user)
                    }
                    }>Add to wishlist</button>
                  </div>
              )
            })
          }

      </div>
    )
  }
}

export default MainStore;