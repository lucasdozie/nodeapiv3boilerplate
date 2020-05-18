require('dotenv').config();
const request = require('supertest');
const server = require('../app/server');
//const User = require('../database/user/user');
//const connectTestDb = require('../helpers/connectTestDb');

const baseUrl = '/api/v1/auth';

// beforeAll(async () => {
//   connectTestDb();

//   User.collection.drop();
// });

describe(`${baseUrl}/register [POST]`, () => {
  it('Registers a user', () =>
    request(server)
      .post(`${baseUrl}/register`)
      .send({
        email: 'email@email.com',
        password: 'worst-kept-secret',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual('User created successfully.');
      }));

  it('Validates the req body.', () =>
    request(server)
      .post(`${baseUrl}/register`)
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        expect(res.body.message).toEqual(
          'Credential must include email and password of type string.',
        );
      }));
});

describe(`${baseUrl}/login [POST]`, () => {
  it('logs a user in', () =>
    request(server)
      .post(`${baseUrl}/login`)
      .send({
        email: 'email@email.com',
        password: 'worst-kept-secret',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual('Signed in successfully.');
      }));

  it('verifies the email', () =>
    request(server)
      .post(`${baseUrl}/login`)
      .send({
        email: 'emails@emails.com',
        password: 'worst-kept-secret',
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        expect(res.body.message).toEqual('Incorrect email.');
      }));

  it('Validates the req body.', () =>
    request(server)
      .post(`${baseUrl}/register`)
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        expect(res.body.message).toEqual(
          'Credential must include email and password of type string.',
        );
      }));
});