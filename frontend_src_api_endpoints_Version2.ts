import client from './client'
import { Book, Session, Recommendation } from '../types'

export const listBooks = async () => {
  const { data } = await client.get<Book[]>('/books')
  return data
}

export const listUpcomingSessions = async () => {
  const { data } = await client.get<Session[]>('/sessions/upcoming')
  return data
}

export const generateSession = async (sessionId: number) => {
  const { data } = await client.post<Recommendation[]>(`/sessions/${sessionId}/generate`)
  return data
}

export const listRecommendations = async (sessionId: number) => {
  const { data } = await client.get<Recommendation[]>(`/sessions/${sessionId}/recommendations`)
  return data
}