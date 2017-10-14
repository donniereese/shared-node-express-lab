// node packages
var path = require('path');

// npm modules
import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs-extra';
import multer from 'multer';
import mimeTypes from 'mime-types';
import React from 'react';
import { renderToString } from 'react-dom/server';

import DataManager from '../meme-dank/data/DataManager';
import App from '../client/components/App';
import index from '../meme-dank/templates';

// Data Storage
const data = new DataManager();

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `public/uploads/${req.body.user || 'unknown'}`;
    if (!fs.existsSync(dir)){
      fs.mkdirpSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    cb(null, Date.now() + '-' + name);
  }
});

// ===LOAD DATA===
//  ----TO DO----
// ===LOAD DATA===

const STATUS_USER_ERROR = 422;

const posts = [];
const server = express();
const upload = multer({ storage: storage });

const getClientIP = (req) => (req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress).split(",")[0];

server.use(bodyParser.json());
server.use(express.static('public', {
    index: false
}));

server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term === undefined) {
    res.json(posts);
  } else {
    let sorted = posts.filter((post, i) => {
      return post.title.indexOf(term) >= 0;
    });
    if (sorted.length === 0) {
      sorted = posts.filter((post, i) => {
        return post.contents.indexOf(term) >= 0;
      });
    }
    res.json(sorted);
  }
});

server.get('/gallery', (req, res) => {
  res.send({show: 'gallery'});
});

server.get('/gallery/:user/:post?', (req, res) => {
  const user = req.param('user');
  const post = req.param('post');
  if (post) { // show them the Post
    res.send({post});
  } else { // show them the User's profile
    res.send({user});
  }
});

server.post('/posts', upload.array('dank-memes'), (req, res) => {
  console.log('======/posts | POST======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Data: ${JSON.stringify(req.body)}`);
  if (req.files.length > 0)
    console.log(`  Files: [${req.files.reduce((files, file) => {
        files.push(file.originalname);
        return files;
      }, [])
    }]`);
  res.json({length: req.files.length});
});

server.put('/posts', (req, res) => {
  // console.log(req.body, req.query, req.params);
  const post = posts.find((p, i) => p.id === req.body.id);
  const postIndex = (post !== undefined) ? posts.indexOf(post) : undefined;

  if (post === undefined) {
    handleUserError({ error: 'This is not the post you are looking for; It is missing the id.' }, res);
    return;
  }

  if (req.body.title === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Post is missing title.' }, res);
    return;
  }

  if (req.body.contents === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Post is missing contents.' }, res);
    return;
  }

  posts[postIndex] = Object.assign(post, req.body);
  res.json(posts[postIndex]);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Request to Delete DENIED on account of you no have ID.' }, res);
    return;
  }

  const postIndex = posts.findIndex((p, i) => p.id === req.body.id);

  if (postIndex === -1) {
    handleUserError({ error: 'Impending Error, Abort! Request to Delete DENIED on account of you no know the known ID.' }, res);
    return;
  }
});

server.get('/', (req, res) => {
  console.log('======/ | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${getClientIP(req)}`);
  const appString = renderToString(<App />);

  res.send(index({
    title: 'Meme Dank',
    body: appString
  }));
});

export default server;
export { posts, upload, data };
