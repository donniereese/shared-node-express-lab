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
/******/ 	__webpack_require__.p = "H:\\Development\\LambdaSchool\\JavaScript\\Week_6\\Node-Express-Lab";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _server = __webpack_require__(1);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3000;

_server2.default.listen(PORT);
console.log('Server running on http://localhost:' + PORT + '/');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = exports.upload = exports.posts = undefined;

var _bodyParser = __webpack_require__(2);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _fsExtra = __webpack_require__(4);

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _multer = __webpack_require__(5);

var _multer2 = _interopRequireDefault(_multer);

var _mimeTypes = __webpack_require__(6);

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(9);

var _DataManager = __webpack_require__(7);

var _DataManager2 = _interopRequireDefault(_DataManager);

var _App = __webpack_require__(10);

var _App2 = _interopRequireDefault(_App);

var _Home = __webpack_require__(15);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// node packages
var path = __webpack_require__(13);

// npm modules


// Data Storage
var data = new _DataManager2.default();

// File Storage
var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    var dir = 'public/uploads/' + (req.body.user || 'unknown');
    if (!_fsExtra2.default.existsSync(dir)) {
      _fsExtra2.default.mkdirpSync(dir);
    }
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    var name = file.originalname;
    cb(null, Date.now() + '-' + name);
  }
});

var STATUS_USER_ERROR = 422;

var posts = [];
var server = (0, _express2.default)();
var upload = (0, _multer2.default)({ storage: storage });

var getClientIP = function getClientIP(req) {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
};

server.use(_bodyParser2.default.json());
server.use(_express2.default.static('public', {
  index: false
}));

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

server.get('/gallery', function (req, res) {
  res.send({ show: 'gallery' });
});

server.get('/gallery/:user/:post?', function (req, res) {
  var user = req.param('user');
  var post = req.param('post');
  if (post) {
    // show them the Post
    res.send({ post: post });
  } else {
    // show them the User's profile
    res.send({ user: user });
  }
});

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

server.get('/', function (req, res) {
  console.log('======/ | GET======');
  console.log('  Request: ' + req.originalUrl);
  console.log('  From: ' + getClientIP(req));
  var appString = (0, _server.renderToString)(_react2.default.createElement(_App2.default, null));

  res.send((0, _Home2.default)({
    title: 'Meme Dank',
    body: appString
  }));
});

exports.default = server;
exports.posts = posts;
exports.upload = upload;
exports.data = data;

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createUUID = __webpack_require__(8);

var _createUUID2 = _interopRequireDefault(_createUUID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataManager = function () {
  _createClass(DataManager, null, [{
    key: 'generateUUID',
    value: function generateUUID() {
      return (0, _createUUID2.default)();
    }
  }]);

  function DataManager() {
    _classCallCheck(this, DataManager);

    // Construct data
    this.data = {
      uniqueIDs: [],
      posts: [],
      defaults: {
        uniqueID: {
          id: null,
          postIDs: [],
          commentRefs: [],
          currentIP: '',
          lastRequest: {},
          ipHistory: [],
          requestHistory: []
        },
        post: {
          id: null,
          thumbnailPath: null,
          imagePaths: [],
          title: '',
          timestampCreated: null,
          likes: 0,
          upvotes: 0,
          comments: []
        },
        post_comment: {
          id: null,
          commenterID: null,
          comment: '',
          timestampCreated: null,
          upvotes: 0
        }
      }
    };
  }

  /* Intent {
   *  action      : read | add | remove | modify
   *  type        : post | comment | uniqueID
   *  target      : posts | post | postComments | postComment ----- not finalized
   *  identifier  : {id: %value%} | {index: %value%}
   *  data: {...} < Not on remove
   * }
   */

  // Find intention


  _createClass(DataManager, [{
    key: 'find',
    value: function find(expectation) {
      // Nouns
      var nouns = ['posts', 'uniqueIDs'];
      /* expectation {
       *  find  : %value%       // value to look for
       *  of    : %subStore%    // something within this store?  specific post, ect (optional)
       *  in    : %dataStore%   // specific store to look in for this.
       * }
       */
      if (!expectation.find || !expectation.in) return false;

      var location = null;

      if (expectation.in !== 'posts' && expectation.in !== 'uniqueIDs') return false;

      var results = this.data[expectation.in].find(function (e, i, a) {
        return e;
      });

      return results;
    }

    // Read intention

  }, {
    key: 'read',
    value: function read(intent) {
      if (intent.action !== 'read') return false;

      var results = this.find({});
      return this.data === this.data;
    }

    // Add intention

  }, {
    key: 'add',
    value: function add(intent) {
      if (intent.action !== 'add') return false;
      // Data default
      var data = null;
      // intent type
      switch (intent.type) {
        case 'uniqueID':
          {
            break;
          }
        case 'post':
          {
            var newUUID = DataManager.generateUUID();
            data = Object.assign({ id: newUUID }, intent.data);
            this.posts.push(data);
            break;
          }
        case 'comment':
          {
            break;
          }
        default:
          {
            return false;
          }
      }

      return this.data === this.data;
    }

    // Remove itention

  }, {
    key: 'remove',
    value: function remove(intent) {
      if (intent.action !== 'remove') return false;
      // Data default
      var data = null;
      // Intent type
      switch (intent.type) {
        case 'uniqueID':
          {
            break;
          }
        case 'post':
          {
            var newUUID = DataManager.generateUUID();
            data = Object.assign({ id: newUUID }, intent.data);
            this.posts.push(data);
            break;
          }
        case 'comment':
          {
            break;
          }
        default:
          {
            return false;
          }
      }
      return this.data === this.data;
    }

    // Modify intention

  }, {
    key: 'modify',
    value: function modify(intent) {
      if (intent.action !== 'remove') return false;
      return this.data === this.data;
    }
  }]);

  return DataManager;
}();

exports.default = DataManager;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(12);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'onClick',
    value: function onClick(event) {
      var formData = new FormData();
      console.log(this.refs.input.files);
      formData.append('user', 'jourdan');
      Array.from(this.refs.input.files).forEach(function (meme) {
        return formData.append('dank-memes', meme);
      });
      _axios2.default.post('posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        return console.log(res.data);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'app' },
        _react2.default.createElement('input', { type: 'file', multiple: true, ref: 'input' }),
        _react2.default.createElement(
          'button',
          { onClick: this.onClick },
          'Submit'
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var body = _ref.body,
      title = _ref.title;

  return "\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>" + title + "</title>\n        <!-- <link rel=\"stylesheet\" href=\"/index.css\" /> -->\n      </head>\n\n      <body>\n        <div id=\"root\">" + body + "</div>\n      </body>\n\n      <script src=\"/bundle.js\"></script>\n    </html>\n  ";
};

/***/ })
/******/ ]);