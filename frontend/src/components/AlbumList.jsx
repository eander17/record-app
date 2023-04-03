// import react stuff
import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'

// import components
import AlbumItem from './AlbumItem'
import AlbumContext from '../context/AlbumContext'
import Spinner from './shared/Spinner'

const AlbumList = () => {
  const { album, isLoading } = useContext(AlbumContext)

  if (!isLoading && (!album || album.length === 0)) return <p>No Albums</p>

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='album-list'>
      <AnimatePresence>
        {album.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlbumItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default AlbumList
