import request from 'supertest'

import { DatabaseService } from '@database/testing'
import { storeUser } from '@users/testing'

import { createAppFromRouter } from './testing'
import { authRouter } from './auth.api'

describe('Auth API', () => {
    const apiUnderTest = createAppFromRouter(authRouter)

    beforeAll(async () => {
        await DatabaseService.connect()
    })

    afterEach(async () => {
        await DatabaseService.clearCollections()
    })

    afterAll(async () => {
        await DatabaseService.disconnect()
    })
    describe('/login', () => {
        it('should return 403 if logging in with empty credentials', () => {
            return request(apiUnderTest)
                .post('/login')
                .expect(403, { message: 'Invalid credentials' })
        })

        it('should return 403 if logging in with wrong credentials', async () => {
            const { email } = await storeUser({
                email: 'test-user@mail.com',
                password: 'test-password',
            })

            return request(apiUnderTest)
                .post('/login')
                .send({ email, password: 'wrong-password' })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(403, { message: 'Invalid credentials' })
        })

        it('should return 200 if logging in with right credentials', async () => {
            const { email } = await storeUser({
                email: 'test-user@mail.com',
                password: 'right-password',
            })

            return request(apiUnderTest)
                .post('/login')
                .send({ email, password: 'right-password' })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
        })
    })
})
