import React from 'react';
import axios from 'axios'

class WishlistRemove extends React.Component {

  handleClick = () => {
    console.log('working')
    axios.post("/api/store/wishlistremove", {
      user: this.props.user,
      item: this.props.item
    })
    .then(data => {
      console.log('here')
      console.log(data)
      this.props.removedItem()
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
        <button onClick={() => this.handleClick()}>Remove from wishlist</button>
    )
  }
}

export default WishlistRemove