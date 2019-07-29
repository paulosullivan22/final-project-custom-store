import React from 'react'
import WishlistRemove from './../../components/WishListRemove'

class Wishlist extends React.Component {
  // state = {
  //   wishlistChange: false
  // }
  
  // removedItem = () => {
  //   this.props.setUser({...this.props.user})
  //   this.setState({ wishlistChange: !this.state.wishlistChange })
  // }

  render() {
    return (
      <div>
        
        {(!this.props.user.wishlist.length) ? 

        (<div>Visit the store to add to your wishlist</div>) : 
        
        (<div className="store-container">

            
            <div className="item-container">
            {this.props.user.wishlist.map(item => {
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
                        <p>{item.type}</p>
                        <span>|</span>
                        <WishlistRemove 
                          item={item}
                          user={this.props.user}
                          removedItem={this.removedItem}
                          setUser={this.props.setUser}
                          />
                      </div>
                  </div>
              )
            })
          }</div>
          
        </div>)}
      </div>
    )
  }
}

export default Wishlist;