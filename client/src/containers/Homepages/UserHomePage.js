import React from 'react'
import axios from 'axios'
import WishlistButton from './../../components/WishlistButton'
// import Typed from 'typed.js'

class UserHomepage extends React.Component {
  state = {
    city: '',
    temp: '',
    inventory: []
  }

  componentDidMount() {
    axios.get("https://ipapi.co/json/")
      .then(res => {
        this.setState({ city: res.data.city })
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&APPID=200ec4f6bebf09606b0090d0fd497aff`)
          .then(data => {
            console.log((data.data.main.temp - 273.15))
            this.setState({
              city: res.data.city,
              temp: (data.data.main.temp - 273.15).toFixed(1)
            })
            console.log(this.state)
          })
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

        let personalInventory = res.data.filter(item=>{
          return this.props.user.gender === item.gender &&
            (wishlistCategories.includes(item.category) ||
             wishlistColors.includes(item.color) ||
            (item.ageRange === this.props.user.age))
        })

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
      <div>

        <h1>Welcome from {this.state.city} where the temperature is {this.state.temp}°C</h1>

        <h2>Your recommended collection: </h2>

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