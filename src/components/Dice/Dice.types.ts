import { ReactNode } from 'react'
import { Dice } from './Dice'

interface IDice {
  Model: typeof Dice.Model
  Controls: typeof Dice.Controls
  children: ReactNode
}

interface IModel {
  position?: [number, number, number]
}

export type { IDice, IModel }
