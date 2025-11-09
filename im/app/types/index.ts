export interface User {
  id: number
  email: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  userId: number
  createdAt: string
}