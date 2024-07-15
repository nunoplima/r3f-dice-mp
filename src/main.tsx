import { insertCoin, isHost, onPlayerJoin } from 'playroomkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ERemotePlayerState } from './enums.ts'
import { randomHexColor } from './functions.ts'
import './index.css'

insertCoin({
  maxPlayersPerRoom: 4,
  skipLobby: true,
}).then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  ),
)

onPlayerJoin((player) => {
  if (!isHost()) return

  player.setState(ERemotePlayerState.color, randomHexColor())
})
