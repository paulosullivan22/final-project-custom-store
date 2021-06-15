import React, { Component } from 'react'
import axios from 'axios'
import WishlistButton from './../../components/WishlistButton'

class UserHomepage extends Component {
  state = {
    city: '',
    inventory: []
  }

  componentDidMount() {
    const { user } = this.props

    axios.get("https://ipapi.co/json/")
      .then(res => {
        this.setState({ city: ` from ${res.data.city}` })
      })
      .catch(err => console.log(err))

    axios
      .get('/api/store')
      .then(res => {

        let wishlistCategories = []
        let wishlistColors = []
        if (user.wishlist) {
          wishlistCategories = user.wishlist.map(item => item.category)
          wishlistColors = user.wishlist.map(item => item.color)
        }

        let personalInventory = []
        
        if (wishlistCategories.length) {
          personalInventory = res.data.filter(item => {
          return user.gender === item.gender &&
            (wishlistCategories.includes(item.category) ||
             wishlistColors.includes(item.color) ||
            (item.ageRange === user.age))
          }) 
        } else {
          personalInventory = res.data.filter(
            item => {
              return user.gender === item.gender
            }
          )
        }

        const shuffle = (array = res.data) => {
          var j, x, i;
          for (i = array.length - 1; i > 0; i--) {
              j = Math.floor(Math.random() * (i + 1));
              x = array[i];
              array[i] = array[j];
              array[j] = x;
          }
          return array;
      }

      let shuffledInventory = shuffle(personalInventory)

      this.setState({ inventory: shuffledInventory })
      })
      .catch(err => {
        console.log(err)
      });

  }
    

  render() {
    const { user, setUser } = this.props
    const { city, inventory } = this.state

    return (
      <div className="user-homepage-container">
      
        <div className="user-homepage-content">

          <h1>Hello, {user.username}.</h1>
          <h3>Welcome{city}.</h3>
          {user.profileImg ? 
            <h4>This collection has been personalised just for you, from data taken from your facial login.</h4>
            :
            <h4>This collection has been personalised for you based on the information you submitted at sign up.</h4>
          }  
        </div>


        <div className="store-container">
          {(!inventory.length) ? 
            (<div>Loading</div>) :
            
            (<div className="item-container">
              {/* NOTE: replace with while loop */}
            {inventory.map((item, i) => {
              return (i < 8) ? (
                  <div className="item-card" key={item._id}>
                    <p>{item.name}</p>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onMouseOver={e => (e.currentTarget.src=`${item.image2}`)}
                      onMouseOut={e => (e.currentTarget.src=`${item.image}`)}
                      />
                    <div className="item-content">
                        <p>{item.category}</p>
                        <span>|</span>
                        <WishlistButton 
                          item={item}
                          user={user}
                          setUser={setUser}
                          />
                      </div>
                  </div>
              ) : null
            })
          }</div>)
        }</div>
      </div>
    )
  }
}

export default UserHomepage;