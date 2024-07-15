import { RapierRigidBody } from '@react-three/rapier'
import { PlayerState } from 'playroomkit'
import { Dispatch, RefObject, SetStateAction } from 'react'

interface IUI {
  soundOn: boolean
  setSoundOn: Dispatch<SetStateAction<boolean>>
  players: PlayerState[]
  diceRef: RefObject<RapierRigidBody>
}

export type { IUI }
