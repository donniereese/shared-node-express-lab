const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs-extra');
const multer = require('multer');
const mimeTypes = require('mime-types');
const DataManager = require('../res/datamanager.js');

// Data Storage
const data = new DataManager();

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `public/uploads/${req.body.user || 'unknown'}`
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


// { storage: storage, options: { fileFilter: ... } };
const upload = multer({ storage: storage });

// User Error Status
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.use(express.static('./public'));


/* Get list of posts
 * - - - - -
 *
 *
 */
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


/* Submit Post data
 *
 *
 *
 *
 */
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


/* Update Post data
 *
 *
 *
 */
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


/* Remove Post
 *
 *
 *
 *
 *
 */
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


/* Get App Webpage
 *
 *
 *
 *
 *
 */
server.get('/', (req, res) => {
  console.log('======/ | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  res.sendFile('./public/index.html');
});

// Export Server to app
module.exports = { posts, server };