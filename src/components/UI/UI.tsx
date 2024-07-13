import { FC } from 'react'
import { IUI } from './UI.types'

export const UI: FC<IUI> = ({ soundOn, setSoundOn, diceRef }) => {
  const handleRespawn = () => {
    if (!diceRef.current) return

    diceRef.current.setTranslation({ x: 0, y: 3, z: 0 }, true)
  }

  const handleSoundToggle = () => {
    setSoundOn((prevSoundOn: boolean) => !prevSoundOn)
  }

  return (
    <div className="fixed bottom-0 right-0 flex flex-col items-end gap-2 p-8">
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

      <button
        onClick={handleRespawn}
        className="text-md focus:ring-white-300 rounded-md bg-gray-700 px-4 py-2 text-white shadow-lg transition-all hover:bg-gray-600 focus:outline-none focus:ring active:scale-90"
      >
        Respawn
      </button>
    </div>
  )
}
