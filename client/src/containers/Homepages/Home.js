import React from 'react';

class Home extends React.Component {

  render() {

    return (
      <div className='home-container'>

        <div className="card-container">
        
          <div className="homepage-card content-card">
            <h1>Welcome to the <span className="underline">Smarter Store</span>.</h1>
            </div> 

          <div className="homepage-card">
            <div className="background-image first-image" />
            </div> 

          <div className="homepage-card content-card">
            <div className="card-content">
              <h5>Website authentification routes lose <span className="underline">millions of visitors</span> every year through poor user experience.</h5>
              </div>
            </div> 

          <div className="homepage-card">
            <div className="background-image second-image" />
            </div> 

          <div className="homepage-card">
            <div className="background-image third-image" />
            </div> 

          <div className="homepage-card content-card">
            <div className="card-content">
              <h5>This website provides <span className="underline">facial authentification</span> to provide a streamlined user experience.</h5>
              </div>
            </div> 

          <div className="homepage-card">
              <div className="background-image fourth-image" />
            </div> 

          <div className="homepage-card content-card">
            <div className="card-content card-content-last">
              <h5>By analysing facial photos, we learn about the user.</h5>
              <h5>From this data, we create a <span className="underline">personalised collection</span> for every single user.</h5>
            </div>
            </div> 

        </div>


      </div>
    )
  }
}

export default Home