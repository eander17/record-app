import { useEffect } from 'react'

// export default function useBeforeUnload(callback) {
//   useEffect(() => {
//     window.addEventListener('beforeunload', callback)
//     return () => window.removeEventListener('beforeunload', callback)
//   }, [callback])
// }

const useBeforeUnload = (callback) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      callback()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [callback])
}

export default useBeforeUnload
