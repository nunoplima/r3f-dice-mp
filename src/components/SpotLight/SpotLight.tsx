import { useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import * as THREE from 'three'
import { ISpotLight } from './SpotLight.types'

export const Spotlight: FC<ISpotLight> = ({ targetRef, ...props }) => {
  const ref = useRef<THREE.SpotLight>(null!)

  // useHelper(ref, THREE.DirectionalLightHelper, 1, 'yellow')

  useFrame(() => {
    if (!ref.current || !targetRef.current) return

    const [x, y, z] = targetRef.current
    ref.current.target.position.set(x, y, z)
    ref.current.target.updateMatrixWorld()
  })

  return (
    <spotLight
      ref={ref}
      angle={Math.PI / 3}
      penumbra={0.5}
      shadow-blurSamples={10}
      shadow-radius={5}
      castShadow
      {...props}
    />
  )
}
