/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/donniereese/Google Drive/Lamda School/Week 6/Node-Express-Lab-2";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    server = _require.server;

var PORT = 3000;

server.listen(PORT);
console.log('Server running on http://localhost:' + PORT + '/');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(2);
var express = __webpack_require__(3);
var fs = __webpack_require__(4);
var multer = __webpack_require__(5);
var mimeTypes = __webpack_require__(6);
// const DataManager = require('./datamanager.js');

// Data Storage
var data = new DataManager();

// File Storage
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var dir = 'public/uploads/' + (req.body.user || 'unknown');
    if (!fs.existsSync(dir)) {
      fs.mkdirpSync(dir);
    }
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    var name = file.originalname;
    cb(null, Date.now() + '-' + name);
  }
});

// { storage: storage, options: { fileFilter: ... } };
var upload = multer({ storage: storage });

// User Error Status
var STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
var posts = [];

var server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.use(express.static('./public'));

/* Get list of posts
 * - - - - -
 *
 *
 */
server.get('/posts', function (req, res) {
  var term = req.query.term;

  if (term === undefined) {
    res.json(posts);
  } else {
    var sorted = posts.filter(function (post, i) {
      return post.title.indexOf(term) >= 0;
    });
    if (sorted.length === 0) {
      sorted = posts.filter(function (post, i) {
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
server.post('/posts', upload.array('dank-memes'), function (req, res) {
  console.log('======/posts | POST======');
  console.log('  Request: ' + req.originalUrl);
  console.log('  From: ' + req.headers.origin);
  console.log('  Data: ' + JSON.stringify(req.body));
  if (req.files.length > 0) console.log('  Files: [' + req.files.reduce(function (files, file) {
    files.push(file.originalname);
    return files;
  }, []) + ']');
  res.json({ length: req.files.length });
});

/* Update Post data
 *
 *
 *
 */
server.put('/posts', function (req, res) {
  // console.log(req.body, req.query, req.params);
  var post = posts.find(function (p, i) {
    return p.id === req.body.id;
  });
  var postIndex = post !== undefined ? posts.indexOf(post) : undefined;

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
server.delete('/posts', function (req, res) {
  var id = req.body.id;

  if (id === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Request to Delete DENIED on account of you no have ID.' }, res);
    return;
  }

  var postIndex = posts.findIndex(function (p, i) {
    return p.id === req.body.id;
  });

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
server.get('/', function (req, res) {
  console.log('======/ | GET======');
  console.log('  Request: ' + req.originalUrl);
  console.log('  From: ' + req.headers.origin);
  res.sendFile('./public/index.html');
});

// Export Server to app
module.exports = { posts: posts, server: server };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mime-types");

/***/ })
/******/ ]);