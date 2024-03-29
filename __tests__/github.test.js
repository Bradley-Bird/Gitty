const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
jest.mock('../lib/services/github');
describe('github routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github Oauth page', async () => {
    const resp = await request(app).get('/api/v1/github/login');

    expect(resp.header.location).toMatch(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const resp = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(resp.body).toEqual({
      id: expect.any(String),
      username: 'notreal',
      email: 'null',
      avatar: 'null',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});
