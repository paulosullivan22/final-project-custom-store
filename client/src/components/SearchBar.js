import React from 'react'

const SearchBar = props => {
    return (
      <div>
        <input 
          className="search-bar"
          type='text'
          placeholder='Search items...'
          onChange={props.searchChange}
          />
      </div>
    )
}

export default SearchBar