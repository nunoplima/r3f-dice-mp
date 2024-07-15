import { Canvas } from '@react-three/fiber'
import { RapierRigidBody } from '@react-three/rapier'
import { Leva } from 'leva'
import { myPlayer, usePlayersList } from 'playroomkit'
import { Perf } from 'r3f-perf'
import { useMemo, useRef, useState } from 'react'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import UI from './components/UI'

function App() {
  const players = usePlayersList(true)
  const me = myPlayer()

  const diceRef = useRef<RapierRigidBody | null>(null)

  const [soundOn, setSoundOn] = useState(false)

  const sortedPlayers = useMemo(
    () =>
      players.sort((a, b) => (a.id === me.id ? -1 : b.id === me.id ? 1 : 0)),
    [players, me.id],
  )

  return (
    <>
      <Leva hidden collapsed />

      <Canvas camera={{ position: [8, 5, 0] }} dpr={[1, 2]} shadows linear>
        {import.meta.env.DEV && <Perf position="top-left" minimal />}
        <color attach="background" args={['#000000']} />

        <Experience diceRef={diceRef} soundOn={soundOn} />
      </Canvas>

      <UI
        diceRef={diceRef}
        setSoundOn={setSoundOn}
        soundOn={soundOn}
        players={players}
      />

      {sortedPlayers.map((player) => (
        <Cursor key={player.id} player={player} />
      ))}
    </>
  )
}

export default App
