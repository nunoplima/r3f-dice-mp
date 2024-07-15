import { myPlayer, setState, useIsHost } from 'playroomkit'
import { FC } from 'react'
import { ERemotePlayerState, ERemoteState } from '../../enums'
import useShare from '../../hooks/useShare'
import { IUI } from './UI.types'

export const UI: FC<IUI> = ({ soundOn, setSoundOn, players, diceRef }) => {
  const isHost = useIsHost()
  const { share } = useShare()

  const handleShare = () => {
    share({ url: window.location.href })
  }

  const handleRespawn = () => {
    if (!diceRef.current) return

    diceRef.current.setTranslation({ x: 0, y: 3, z: 0 }, true)

    setState(ERemoteState.currentPlayer, myPlayer().id)
    setState(ERemoteState.dicePosition, { x: 0, y: 3, z: 0 })
  }

  const handleSoundToggle = () => {
    setSoundOn((prevSoundOn: boolean) => !prevSoundOn)
  }

  return (
    <>
      <div className="absolute right-0 top-0 flex gap-1 p-6 sm:p-8">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center rounded-full bg-gray-700 p-1 shadow-xl"
          >
            <div
              className="h-8 w-8 rounded-full"
              style={{
                backgroundColor: player.getState(ERemotePlayerState.color),
              }}
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 right-0 flex flex-col items-end gap-2 p-6 sm:p-8">
        {isHost && (
          <>
            <button
              className="focus:ring-white-300 w-fit rounded-md bg-gray-700 px-4 py-2 text-white shadow-lg transition-all hover:bg-gray-600 focus:outline-none focus:ring active:scale-90"
              onClick={handleShare}
            >
              Invite
            </button>

            <button
              onClick={handleRespawn}
              className="text-md focus:ring-white-300 rounded-md bg-gray-700 px-4 py-2 text-white shadow-lg transition-all hover:bg-gray-600 focus:outline-none focus:ring active:scale-90"
            >
              Respawn
            </button>
          </>
        )}

        <button
          onClick={handleSoundToggle}
          className="focus:ring-white-300 w-fit rounded-md bg-gray-700 px-4 py-2 text-white shadow-lg transition-all hover:bg-gray-600 focus:outline-none focus:ring active:scale-90"
        >
          <img
            src={`icons/sound-${soundOn ? 'on' : 'off'}.svg`}
            height={18}
            width={18}
          />
        </button>
      </div>
    </>
  )
}
