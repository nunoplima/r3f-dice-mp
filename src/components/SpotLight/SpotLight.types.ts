import { RefObject } from 'react'
import * as THREE from 'three'

interface ISpotLight {
  targetRef: RefObject<THREE.Vector3>
  position: [number, number, number]
  intensity: number
  color: string
  depthBuffer: THREE.DepthTexture
}

export type { ISpotLight }
