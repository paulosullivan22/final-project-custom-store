import React from 'react'
import axios from 'axios'

class MainStore extends React.Component {
  state = {
    inventory: []
  }


  componentDidMount() {
    axios
      .get('/api/inventory')
      .then(res => {
        console.log(res)
        this.setState({
          inventory: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
    
  }

  render() {
    console.log(this.props.user)

    return (
      <div>

          {(!this.state.inventory.length) ? 
            <div>Loading</div> :

            this.state.inventory.map(item => {
              return (
                  <div key={item.itemName}>
                    <h2>{item.itemName}</h2>
                    <p>{item.itemType}</p>
                  </div>
              )
            })
          }

      </div>
    )
  }
}

export default MainStore;