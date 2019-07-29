import React from 'react';
import axios from 'axios'

class WishlistButton extends React.Component {

  handleClick = () => {
    axios.post("/api/store/wishlist", {
      user: this.props.user,
      item: this.props.item
    })
    .then(data => {
      console.log('here')
      console.log(data)
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