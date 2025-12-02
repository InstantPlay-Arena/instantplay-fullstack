import { getToken, setToken, clearToken, login, signup } from '@/lib/auth'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('setToken', () => {
    it('should set token in localStorage', () => {
      const token = 'test_token_123'
      setToken(token)
      expect(localStorage.getItem('auth_token')).toBe(token)
    })
  })

  describe('getToken', () => {
    it('should return null when no token is set', () => {
      expect(getToken()).toBeNull()
    })

    it('should return token when it exists', () => {
      const token = 'test_token_456'
      setToken(token)
      expect(getToken()).toBe(token)
    })
  })

  describe('clearToken', () => {
    it('should remove token from localStorage', () => {
      setToken('test_token')
      clearToken()
      expect(getToken()).toBeNull()
    })
  })

  describe('decodeToken', () => {
    it('should decode a valid JWT', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      const decoded = require('@/lib/auth').decodeToken(token)
      expect(decoded).toHaveProperty('name')
      expect(decoded.name).toBe('John Doe')
    })
  })
})
