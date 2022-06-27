const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post');

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end;
  });

  it.skip('should add a new post ', async () => {
    const post = new Post({
      post: 'hello world',
      user_id: 1,
    });
    const resp = await request(app).post('/posts').send(post);
    console.log('resp', resp);
    expect(resp.body.post).toEqual(post.post);
  });
});
