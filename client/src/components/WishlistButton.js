import React from 'react';
import axios from 'axios'

class WishlistButton extends React.Component {

  handleClick = () => {
    axios.post("/api/store/wishlist", {
      user: this.props.user,
      item: this.props.item
    })
    .then(res => {
      console.log('here')
      console.log(res.data)
      this.props.setUser(res.data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
        <button onClick={() => this.handleClick()}>Add to wishlist</button>
    )
  }
}

export default WishlistButton