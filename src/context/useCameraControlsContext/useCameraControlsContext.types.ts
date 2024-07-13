import { CameraControls } from '@react-three/drei'
import { MutableRefObject } from 'react'

interface ICameraControls {
  cameraControlsRef: MutableRefObject<CameraControls | null>
}

export type { ICameraControls }
