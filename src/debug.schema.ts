import { folder } from 'leva'

export const schema = {
  floor: folder(
    {
      floorColor: { value: '#ffffff' },
    },
    { collapsed: true },
  ),
  lights: folder(
    {
      spotLightOneColor: { value: '#0c8cbf' },
      spotLightTwoColor: { value: '#b00c3f' },
      spotLightsIntensity: {
        value: Math.PI * 250,
        min: 0,
        max: Math.PI * 1000,
        step: 0.1,
      },
    },
    { collapsed: true },
  ),
  remote: folder({
    rotationIntFactor: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    positionIntFactor: {
      value: 0.15,
      min: 0,
      max: 1,
      step: 0.01,
    },
  }),
}
