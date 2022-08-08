const { deepStrictEqual, ok } = require('assert');
const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');

describe('Api Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app).get('/contact').expect(200);
      deepStrictEqual(response.text, 'contact us page');
    })
  })

  describe('/', () => {
    it('should request the home page and return HTTP Status 200', async () => {
      const response = await request(app).get('/').expect(200);
      deepStrictEqual(response.text, 'Hello World!');
    })
  })

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .expect(200);
      deepStrictEqual(response.text, 'Login has succeeded');
    })

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'Xuxa',
          password: 'Xuxa'
        })
        .expect(401);
      ok(response.unauthorized)
      deepStrictEqual(response.text, 'Login has failed');
    })
  })
})