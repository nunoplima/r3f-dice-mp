import { RapierRigidBody } from '@react-three/rapier'
import { RefObject } from 'react'

interface IExperience {
  soundOn: boolean
  diceRef: RefObject<RapierRigidBody>
}

export type { IExperience }
