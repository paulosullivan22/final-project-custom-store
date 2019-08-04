import React from 'react'
import WishlistRemove from './../../components/WishListRemove'

const Wishlist = props => {

  return (
    <div className="wishlist-container">

      <h1>Wishlist</h1>
      
      <hr />
      
      {(!props.user.wishlist.length) ?  // check for an empty wishlist to display message below

      (<div className="empty-wishlist-message">Visit the store to add to your wishlist.</div>) : 

      // if items are in wishlist, container is displayed
      (<div className="store-container">

          <div className="item-container">
          {props.user.wishlist.map(item => {
            return (
                <div className="item-card" key={item._id}>
                  <p>{item.name}</p>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    onMouseOver={e => (e.currentTarget.src=`${item.image2}`)} // mouse hover to flip images
                    onMouseOut={e => (e.currentTarget.src=`${item.image}`)}
                    />
                  <div className="item-content">
                      <p>{item.category}</p>
                      <span>|</span>
                      <WishlistRemove 
                        item={item}
                        user={props.user}
                        setUser={props.setUser}
                        />
                    </div>
                </div>
              )
            })
          }
        </div>
      </div>)}
    </div>
  )
}


export default Wishlist;