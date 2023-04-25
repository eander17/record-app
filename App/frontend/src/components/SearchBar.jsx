import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ placeholder, onSubmit, onChange, className }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    if(onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className='search-bar'>
        <input
          type='search'
          name='search'
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <button type='submit'>
          <FaSearch />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
