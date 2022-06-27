const pool = require('../utils/pool');
const GithubUser = require('./GithubUser');

module.exports = class Post {
  id;
  post;

  constructor(row) {
    this.id = row.id;
    this.post = row.post;
    this.github_users =
      row.github_users?.length > 0
        ? row.github_users.map((id) => new GithubUser(id))
        : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`SELECT 
    posts.*, 
      COALESCE(
        json_agg(to_jsonb(github_users)) FILTER (WHERE github_users.id IS NOT NULL), '[]'
      ) as github_users
      FROM posts
      LEFT JOIN github_users on github_users.id =  posts.user_id
      GROUP BY posts.id;

`);
    return rows.map((row) => new Post(row));
  }

  static async insert({ post, user_id }) {
    const { rows } = await pool.query(
      `
    INSERT INTO posts (post, user_id) VALUES ($1,$2) RETURNING * `,
      [post, user_id]
    );
    return new Post(rows[0]);
  }
};
