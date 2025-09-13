import { useEffect, useState } from 'react'
import { listRecommendations } from '../api/endpoints'
import { Recommendation } from '../types'

export function useRecommendation(sessionId: number | undefined) {
  const [data, setData] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!sessionId) return
    setLoading(true)
    listRecommendations(sessionId)
      .then(setData)
      .finally(()=>setLoading(false))
  }, [sessionId])

  return { data, loading, refresh: () => sessionId && listRecommendations(sessionId).then(setData) }
}