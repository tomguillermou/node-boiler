// import express from 'express'
// import request from 'supertest'

// import { clearCollections, connectToDatabase, disconnectFromDatabase } from '@database'
// import { createUser } from '@users'

// import { authApi } from './auth.api'

// describe('Auth API', () => {
//   const apiUnderTest = express().use(express.json()).use(authApi)

//   beforeAll(async () => {
//     await connectToDatabase()
//   })

//   afterEach(async () => {
//     await clearCollections()
//   })

//   afterAll(async () => {
//     await disconnectFromDatabase()
//   })

//   describe('/login', () => {
//     it('should return 403 if logging in with empty credentials', () => {
//       return request(apiUnderTest).post('/login').expect(403, { error: 'Invalid credentials' })
//     })

//     it('should return 403 if logging in with wrong credentials', async () => {
//       const { email } = await createUser({
//         email: 'test-user@mail.com',
//         password: 'test-password',
//       })

//       return request(apiUnderTest)
//         .post('/login')
//         .send({ email, password: 'wrong-password' })
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json')
//         .expect(403, { error: 'Invalid credentials' })
//     })

//     it('should return 200 if logging in with right credentials', async () => {
//       const { email } = await createUser({
//         email: 'test-user@mail.com',
//         password: 'right-password',
//       })

//       const response = await request(apiUnderTest)
//         .post('/login')
//         .send({ email, password: 'right-password' })
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json')
//         .expect(200)

//       expect(response.body.data.jwt).toBeDefined()
//       expect(typeof response.body.data.jwt).toBe('string')
//     })
//   })
// })
