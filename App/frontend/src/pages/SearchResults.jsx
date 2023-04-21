import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchAlbums, reset } from '../features/search/searchSlice'
import Spinner from '../components/Spinner'
import AlbumItem from '../components/AlbumItem'
import PageNav from '../components/PageNav'


function SearchResults() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { query } = useParams()

  const { user } = useSelector((state) => state.auth)
  const { searchResults, page, isLoading, isError, message } = useSelector(
    (state) => state.search
  )

  const [currentPage, setCurrentPage] = useState(page)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    // if user is not logged in, redirect to login page
    if (!user) {
      navigate('/login')
    } else {
      console.log(`from searchResults useEffect: ${query}, ${currentPage}`)
      dispatch(searchAlbums({query, currentPage}))
    }

    // triggered when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch, query, currentPage])

  const setPage = (newPage) => {
    setCurrentPage(newPage)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Search Results</h1>
        <p>Search Term: {query} </p>
      </section>
      <section className='content'>
        {searchResults.length > 0 ? (
          <div className='collection'>
            {searchResults.map((album) => (
              <AlbumItem
                key={album.discogsId}
                album={album}
                buttonValue={'add'}
              />
            ))}
          </div>
        ) : (
          <h3>Your collection is empty</h3>
        )}
      </section>
      <PageNav setPage={setPage} />
    </>
  )
}

export default SearchResults


