import React from 'react'

const SearchBar = ({ searchChange }) => {
    return (
      <div>
        <input 
          className="search-bar"
          type='text'
          placeholder='Search items...'
          onChange={searchChange}
          />
      </div>
    )
}

export default SearchBar