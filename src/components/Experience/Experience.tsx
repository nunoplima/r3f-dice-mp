import {
  CameraControls as R3DCameraControls,
  useDepthBuffer,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, Physics, RigidBody, vec3 } from '@react-three/rapier'
import { folder, useControls } from 'leva'
import { FC, Suspense, useRef } from 'react'
import * as THREE from 'three'
import Dice from '../Dice'
import Spotlight from '../SpotLight'
import { IExperience } from './Experience.types'

export const Experience: FC<IExperience> = ({ soundOn, diceRef }) => {
  const {
    floorColor,
    spotLightOneColor,
    spotLightTwoColor,
    spotLightsIntensity,
  } = useControls({
    floor: folder(
      {
        floorColor: { value: '#ffffff' },
      },
      { collapsed: true },
    ),
    lights: folder(
      {
        spotLightOneColor: { value: '#0c8cbf' },
        spotLightTwoColor: { value: '#b00c3f' },
        spotLightsIntensity: {
          value: Math.PI * 250,
          min: 0,
          max: Math.PI * 1000,
          step: 0.1,
        },
      },
      { collapsed: true },
    ),
  })

  const lookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))

  // depth buffer that only renders once (frames: 1 is optional), which works well for static scenes
  const depthBuffer = useDepthBuffer({ frames: 1 })

  useFrame(({ camera }) => {
    if (!diceRef.current || !lookAtRef.current) return

    const lookAt = vec3(diceRef.current.translation())
    lookAtRef.current.lerp(lookAt, 0.1)
    camera.lookAt(lookAtRef.current)
  })

  return (
    <>
      <R3DCameraControls
        maxPolarAngle={Math.PI / 2}
        maxDistance={Math.PI * 2.5}
        minDistance={Math.PI * 1.5}
        makeDefault
      />

      <Spotlight
        targetRef={lookAtRef}
        position={[5, 5, 4]}
        color={spotLightOneColor}
        intensity={spotLightsIntensity}
        depthBuffer={depthBuffer}
      />
      <Spotlight
        targetRef={lookAtRef}
        position={[-5, 5, -6]}
        color={spotLightTwoColor}
        intensity={spotLightsIntensity}
        depthBuffer={depthBuffer}
      />

      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]} debug={false}>
          <Dice ref={diceRef} soundOn={soundOn} />

          {/* walls */}
          <RigidBody type="fixed" name="walls">
            <CuboidCollider args={[7.5, 10, 0]} position={[0, 1, 7.5]} />
            <CuboidCollider args={[7.5, 10, 0]} position={[0, 1, -7.5]} />
            <CuboidCollider args={[0, 10, 7.5]} position={[7.5, 1, 0]} />
            <CuboidCollider args={[0, 10, 7.5]} position={[-7.5, 1, 0]} />
            <CuboidCollider args={[7.5, 0, 7.5]} position={[0, 10, 0]} />
          </RigidBody>

          {/* floor */}
          <RigidBody type="fixed" name="floor">
            <mesh
              scale-x={50}
              scale-y={50}
              position={[0, -1, 0]}
              rotation-x={-Math.PI / 2}
              receiveShadow
            >
              <planeGeometry />
              <meshStandardMaterial color={floorColor} />
            </mesh>
          </RigidBody>
        </Physics>
      </Suspense>
    </>
  )
}
