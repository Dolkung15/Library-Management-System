import axios, { AxiosInstance } from 'axios'

export class AuthService {
  protected readonly instance: AxiosInstance
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Timeout'
    })
  }

  login = (email: string, password: string) => {
    console.log('login')
    return this.instance
      .post(
        'http://localhost:5000/LoginProcess',
        { email, password },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(res => {
        return {
          userId: res.data.userId,
          username: res.data.user.username,
          email: res.data.user.email,
          role: res.data.role,
          token: res.data.token,
          expiredAt: res.data.exp,
        }
      })
  }
}
