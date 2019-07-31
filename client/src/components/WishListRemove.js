import React from 'react';
import axios from 'axios'

class WishlistRemove extends React.Component {

  handleClick = () => {
    console.log('working')
    axios.post("/api/store/wishlistremove", {
      user: this.props.user,
      item: this.props.item
    })
    .then(res => {
      console.log(res.data)
      console.log('here')
      this.props.setUser(res.data)
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