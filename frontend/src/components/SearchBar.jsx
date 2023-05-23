/** @format */
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({
  placeholder,
  onSubmit,
  onChange,
  className,
}) => {
  const [query, setQuery] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    onChange && onChange(e.target.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      // className={className}
      className={` rounded-lg border-2 border-solid  bg-white
        ${inputFocused ? 'border-jewel' : 'border-void'}
      `}
    >
      <input
        required
        type='search'
        name='search'
        value={query}
        onChange={handleChange}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        placeholder={placeholder}
        className='border-none rounded-4xl focus:outline-none text-md font-semibold'
      />
      <button
        type='submit '
        className='px-2 py-3 rounded-md  
        hover:bg-fuschia-custom bg-void text-stark hover:text-void 
        dark:text-void dark:bg-tin dark:hover:bg-jewel dark:hover:text-stark
        transition-all duration-150 ease-linear cursor-pointer'
        disabled={!query}
      >
        <FaSearch className='text-md mx-1 ' />
      </button>
    </form>
  )
}

export default SearchBar
