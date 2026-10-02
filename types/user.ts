export type User = {
  _id: string
  username: string
  email: string
  password: string
  role: string
}

export type UserAuth = {
  userId: string
  username: string
  email: string
  role: string
  token: string
  expiredAt: number
}
