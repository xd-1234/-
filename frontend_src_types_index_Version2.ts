export interface Book {
  id: number
  title: string
  category: string
  reading_level_min?: number
  reading_level_max?: number
  popularity: number
  status: string
  reserved_flag?: string
}

export interface Session {
  id: number
  date: string
  clazz: string
  planned_students: number
  status: string
}

export interface Recommendation {
  id: number
  session_id: number
  student_id: number
  primary_book_id: number | null
  alt_book_ids?: number[]
  chosen_book_id?: number | null
  fallback_used: boolean
  generated_at: string
}