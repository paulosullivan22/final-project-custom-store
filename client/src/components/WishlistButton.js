import React, { Component } from 'react';
import axios from 'axios'

class WishlistButton extends Component {

  handleClick = () => {
    const { user, item, setUser } = this.props 

    axios.post("/api/store/wishlist", {
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
            Add to wishlist
            </button>
    )
  }
}

export default WishlistButton