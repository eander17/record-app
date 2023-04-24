import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const NavigationContext = createContext()

export const useGlobalNavigate = () => {
  const navigate = useContext(NavigationContext)
  if (!navigate) {
    throw new Error(
      'useGlobalNavigate must be used within a NavigationProvider'
    )
  }
  return navigate
}

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate()
  const value = useMemo(() => navigate, [navigate])
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
