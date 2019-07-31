import React from 'react'
import axios from 'axios'
import WishlistButton from './../../components/WishlistButton'

class UserHomepage extends React.Component {
  state = {
    city: '',
    inventory: []
  }

  componentDidMount() {
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
        if (this.props.user.wishlist) {
          wishlistCategories = this.props.user.wishlist.map(item => item.category)
          wishlistColors = this.props.user.wishlist.map(item => item.color)
        }

        let personalInventory = []
        
        if (wishlistCategories.length) {
          personalInventory = res.data.filter(item => {
          return this.props.user.gender === item.gender &&
            (wishlistCategories.includes(item.category) ||
             wishlistColors.includes(item.color) ||
            (item.ageRange === this.props.user.age))
          }) 
        } else {
          personalInventory = res.data.filter(
            item => {
              return this.props.user.gender === item.gender
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

    return (
      <div className="user-homepage-container" class={(this.props.user.gender === "Male") ? "male-background" : "female-background"}>
      
        <div className="user-homepage-content">

          <h1>Hello, {this.props.user.username}.</h1>
          <h3>Welcome{this.state.city}.</h3>
          <h4>This is a collection that we think you will love, personalised just for you.</h4>

        </div>


        <div className="store-container">
          {(!this.state.inventory.length) ? 
            (<div>Loading</div>) :
            
            (<div className="item-container">
            {this.state.inventory.map((item, i) => {
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
                          user={this.props.user}
                          setUser={this.props.setUser}
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