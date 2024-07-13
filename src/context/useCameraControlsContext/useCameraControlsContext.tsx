import { ReactNode, createContext, useContext, useRef } from 'react'
import { ICameraControls } from './useCameraControlsContext.types'

const CameraControlsContext = createContext<ICameraControls | null>(null)

export const CameraControlsContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const cameraControlsRef = useRef(null)

  return (
    <CameraControlsContext.Provider value={{ cameraControlsRef }}>
      {children}
    </CameraControlsContext.Provider>
  )
}

export const useCameraControlsContext = () => {
  if (!CameraControlsContext) {
    throw new Error('useCameraControlsContext must be used inside a provider')
  }

  return useContext(CameraControlsContext)
}
