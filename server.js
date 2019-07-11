const express = require('express');
const bodyParser = require('body-parser');

const {
  find,
  findById,
  insert,
  update,
  remove
} = require('./data/db');

// const db = require('./data/db');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.json('API is Running');
});

server.get('/api/users', (req, res) => {
  find()
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
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

server.post('/api/users', (req, res) => {
  const newUser = req.body
  //console.log(newUser);
  insert(newUser)
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(403).json({ error: err }));
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  remove(id)
    .then(user => {
      if (user === 0) {
        res.status(404).json({ message: 'No user found with that id'});
      } else if (user === 1) {
        res.json({message: "User deleted"});
      }
    })
    .catch(err => res.json({error: err}));
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const editedUser = req.body
  //console.log(newUser);
  update(id, editedUser)
    .then(result => {
      if (result === 1) {
        res.json({message: `User with id: ${id} is updated`})
      } else if (result === 0) {
        res.json({message: `Cannot find a user with id: ${id}`})
      }
    })
    .catch(err => res.status(503).json({ error: err }));
});


server.listen(5000, () => console.log("\n=== API is running on port 5000 ===\n"));