import { createContext, useContext, useState } from 'react'

const AvatarContext = createContext(null)

const DEFAULT_AVATAR = 'https://i.pravatar.cc/56?img=12'

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
