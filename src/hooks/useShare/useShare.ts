import { useCallback, useEffect, useState } from 'react'
import { IShareParams, IUseShareParams } from './useShare.types'

export const useShare = ({ successTimeout = 3000 }: IUseShareParams = {}) => {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isShared, setIsShared] = useState<boolean>(false)

  // check for Web Share API support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'navigator' in window) {
      setIsSupported('share' in navigator)
      setIsReady(true)
    }
  }, [])

  // function to handle the reset of isShared state
  const resetIsShared = (timeout: number) => {
    const timer = setTimeout(() => setIsShared(false), timeout)
    return () => clearTimeout(timer)
  }

  // function to handle sharing or fallback
  const share = useCallback(
    async (content: IShareParams) => {
      if (isSupported) {
        try {
          // Attempt to use the Web Share API
          await navigator.share(content)
          setIsShared(true)

          return resetIsShared(successTimeout)
        } catch (error) {
          console.error?.(error)
        }
      } else {
        setIsShared(true)

        return resetIsShared(successTimeout)
      }
    },
    [isSupported, successTimeout],
  )

  return { share, isSupported, isReady, isShared }
}
