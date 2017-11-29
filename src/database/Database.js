const { Client } = require('pg');
const QueryStream = require('pg-query-stream');
const JSONStream = require('JSONStream');
const Pool = require('pg-pool');
const url = require('url');

export default class Database {
  constructor(connectionString) {
    console.log('connectionstring', connectionString);
    const params = url.parse(connectionString);
    const config = {
      user: params.username,
      password: params.password,
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1]
    };

    this.pool = new Pool(config);
  }

  runQuery = async query => {
    console.log('run query ', query);
    const client = await this.pool.connect();
    try {
      return client.query(new QueryStream(query.sql, query.params));
    } finally {
      client.release();
    }
  };
}
