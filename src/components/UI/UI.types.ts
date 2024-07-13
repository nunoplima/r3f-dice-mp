import { RapierRigidBody } from '@react-three/rapier'
import { Dispatch, RefObject, SetStateAction } from 'react'

interface IUI {
  soundOn: boolean
  setSoundOn: Dispatch<SetStateAction<boolean>>
  diceRef: RefObject<RapierRigidBody>
}

export type { IUI }
