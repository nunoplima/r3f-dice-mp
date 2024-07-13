import { Canvas } from '@react-three/fiber'
import { RapierRigidBody } from '@react-three/rapier'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'
import Experience from './components/Experience'
import UI from './components/UI'

function App() {
  const diceRef = useRef<RapierRigidBody | null>(null)

  const [soundOn, setSoundOn] = useState(false)

  return (
    <>
      <Leva hidden={window.location.href.split('#')[1] !== 'debug'} collapsed />

      <Canvas camera={{ position: [8, 5, 0] }} dpr={[1, 2]} shadows>
        {import.meta.env.DEV && <Perf position="top-left" minimal />}
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 20]} />
        <Experience diceRef={diceRef} soundOn={soundOn} />
      </Canvas>

      <UI diceRef={diceRef} setSoundOn={setSoundOn} soundOn={soundOn} />
    </>
  )
}

export default App
