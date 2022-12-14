const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post');
const agent = request.agent(app);
jest.mock('../lib/services/github');

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end;
  });

  it('should add a new post ', async () => {
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const post = new Post({
      post: 'hello world',
      user_id: 1,
    });
    const resp = await agent.post('/api/v1/posts').send(post);
    expect(resp.body.post).toEqual(post.post);
  });

  it('should sign in user, create a post and get that post', async () => {
    //sign in
    const user = await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    //post model
    const post = {
      post: 'hello world',
      user_id: user.body.id,
    };
    //create post
    const resp = await agent.post('/api/v1/posts').send(post);
    expect(resp.body.post).toEqual(post.post);
    const final = await agent.get('/api/v1/posts');
    expect(final.body).toEqual([
      {
        github_users: [
          { avatar: 'null', email: 'null', id: 1, username: 'notreal' },
        ],
        id: '1',
        post: 'hello world',
        user_id: '1',
      },
    ]);
  });
});
