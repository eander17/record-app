// /** @format */
// import { useSelector } from 'react-redux'
// import { FaSearch } from 'react-icons/fa'
// import PropTypes from 'prop-types'
// import { setQueryReducer } from '../features/search/searchSlice'

// function SearchBar({ placeholder, onSubmit, onChange }) {
//   const query = useSelector((state) => state.search.query)
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(query)
//     setQuery('')
//   }

//   // const handleChange = (e) => {
//   //   // setQuery(e.target.value)
//   //   // eslint-disable-next-line no-unused-expressions
//   //   onChange(e.target.value)
//   // }

//   return (
//     <form
//       className=''
//       onSubmit={handleSubmit}
//     >
//       <div className='join'>
//         <input
//           required
//           type='search'
//           name='search'
//           value={query}
//           onChange={(e) => setQueryReducer(e.target.value)}
//           placeholder={placeholder}
//           className='input-bordered input-primary input join-item'
//         />
//         <button
//           type='submit'
//           className='btn-secondary join-item btn '
//           disabled={!query}
//         >
//           <FaSearch className='' />
//         </button>
//       </div>
//     </form>
//   )
// }

// SearchBar.propTypes = {
//   placeholder: PropTypes.string,
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func, // fix is this used in all calls?
// }

// SearchBar.defaultProps = {
//   placeholder: 'Search',
//   onChange: null,
// }

// export default SearchBar
