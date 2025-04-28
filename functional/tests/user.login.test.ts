import { beforeAll, describe, expect, test } from 'vitest'

import App from '../src/index.js'

/////////////////////////////
// Exemple de divers tests que vous pouvre réaliser pour s'assurer que votre api fonctionne correctement dans un environnement isolé
/////////////////////////
//
describe('Users Login tests', async () => {

  test('Login should return a 404 if user not found', async () => {
    const res = await App.request('/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        username: 'loginUser',
        password: 'Password123',
      }),
    })

    const resJson = await res.json()
    expect(res.status).toBe(404)

    expect(resJson.error).not.toBeUndefined()
    expect(resJson.error).toBe('Utilisateur non trouvé')
  })

  describe("Authenticated request", async () => {
    beforeAll(async () => {
      await App.request('/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username: 'loginUser',
          password: 'Password123',
          role: 'admin',
          email: 'hello@work.com'
        }),
      })
    })

    test('Login should successfully if user exist and password match', async () => {
      const res = await App.request('/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username: 'loginUser',
          password: 'Password123',
        }),
      })
      const resJson = await res.json();
      expect(res.status).toBe(200)

      expect(resJson.accessToken).not.toBeNull()
      expect(resJson.refreshToken).not.toBeNull();
    })

    test('Login should return error if user exist but password is not correct', async () => {
      const res = await App.request('/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          username: 'loginUser',
          password: 'Password321',
        }),
      })
      const resJson = await res.json();
      expect(res.status).toBe(401)

      expect(resJson.error).not.toBeUndefined()
      expect(resJson.error).toBe('Mot de passe incorrect')
    })

  })
})
