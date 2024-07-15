import { myPlayer } from 'playroomkit'
import { FC, useCallback, useEffect, useRef } from 'react'
import { ERemotePlayerState } from '../../enums'
import { ICursor } from './Cursor.types'

export const Cursor: FC<ICursor> = ({ player }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const me = myPlayer()

  const position = player.getState(ERemotePlayerState.position)
  const color = player.getState(ERemotePlayerState.color)

  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  const handlePointerMovement = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || me.id !== player.id) return

      const centerX = windowSize.width / 2
      const centerY = windowSize.height / 2

      const x = (e.clientX - centerX) / centerX
      const y = (e.clientY - centerY) / centerY

      const screenX = centerX + x * centerX
      const screenY = centerY + y * centerY

      ref.current.style.top = screenY + 'px'
      ref.current.style.left = screenX + 'px'

      player.setState(ERemotePlayerState.position, { x, y })
    },
    [me.id, player, windowSize.height, windowSize.width],
  )

  useEffect(() => {
    if (!ref.current || !position || me.id === player.id) return

    const { x, y } = position

    const clientCenterX = windowSize.width / 2
    const clientCenterY = windowSize.height / 2

    const screenX = clientCenterX + x * clientCenterX
    const screenY = clientCenterY + y * clientCenterY

    ref.current.style.top = screenY + 'px'
    ref.current.style.left = screenX + 'px'
  }, [me.id, player, position, windowSize.height, windowSize.width])

  useEffect(() => {
    addEventListener('mousemove', handlePointerMovement)

    return () => {
      removeEventListener('mousemove', handlePointerMovement)
    }
  }, [handlePointerMovement])

  return (
    <div ref={ref} className="pointer-events-none absolute">
      <svg
        fill={color}
        width="18px"
        height="18px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="primary"
          d="M20.8,9.4,4.87,2.18A2,2,0,0,0,2.18,4.87h0L9.4,20.8A2,2,0,0,0,11.27,22h.25a2.26,2.26,0,0,0,2-1.8l1.13-5.58,5.58-1.13a2.26,2.26,0,0,0,1.8-2A2,2,0,0,0,20.8,9.4Z"
          fill={color}
        ></path>
      </svg>
    </div>
  )
}
