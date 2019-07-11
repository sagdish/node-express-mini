const express = require('express');
const {
  find,
  findById,
  insert,
  update,
  remove
} = require('./data/db');

// const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.json('API is Running');
});

server.get('/api/users', (req, res) => {
  find()
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
  // const users = find();
  // res.json(users);
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  findById(id)
    .then(user => {
      if (user.length === 0) {
        res.status(404).json({ message: 'User not found'});
      } else {
        res.json(user[0]);
      }
    })
    .catch(err => res.json({error: err}));
});

server.listen(5000, () => console.log("\n=== API is running on port 5000 ===\n"));