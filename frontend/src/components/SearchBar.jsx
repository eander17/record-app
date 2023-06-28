/** @format */
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ placeholder, onSubmit, onChange }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(query)
    setQuery('')
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    onChange && onChange(e.target.value)
  }

  return (
    <form
      className=''
      onSubmit={handleSubmit}
    >
      <div className='join'>
        <input
          required
          type='search'
          name='search'
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className='input-bordered input-primary input join-item'
        />
        <button
          type='submit'
          className='btn-secondary join-item btn '
          disabled={!query}
        >
          <FaSearch className='' />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
