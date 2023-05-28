const axios = require('axios');

if (!process.env.API_URL) {
  throw new Error('API_URL environment variable missing');
}

if (!process.env.API_TOKEN) {
  throw new Error('API_TOKEN environment variable missing');
}

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: process.env.API_TIMEOUT || 30000,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

module.exports = api;
