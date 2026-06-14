import { createContext, useContext, useState } from 'react'

const AvatarContext = createContext(null)

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23e0ede0'/%3E%3Ccircle cx='40' cy='32' r='14' fill='%2366bb6a'/%3E%3Cellipse cx='40' cy='72' rx='22' ry='16' fill='%2366bb6a'/%3E%3C/svg%3E"

export function AvatarProvider({ children }) {
  const [avatar, setAvatar] = useState(
    () => localStorage.getItem('carefit_avatar') || DEFAULT_AVATAR
  )

  function updateAvatar(dataUrl) {
    setAvatar(dataUrl)
    localStorage.setItem('carefit_avatar', dataUrl)
  }

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatar() {
  return useContext(AvatarContext)
}
