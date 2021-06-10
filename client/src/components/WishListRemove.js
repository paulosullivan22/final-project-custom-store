import React, { Component } from 'react';
import axios from 'axios'

class WishlistRemove extends Component {

  handleClick = () => {
    const { user, item, setUser } = this.props
    axios.post("/api/store/wishlistremove", {
      user: user,
      item: item
    })
    .then(res => {
      setUser(res.data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
        <button 
          className="wishlist-button"  
          onClick={() => this.handleClick()}>
            Remove from wishlist
            </button>
    )
  }
}

export default WishlistRemove