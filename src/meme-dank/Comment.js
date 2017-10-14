import Post from './Post';
import User from './User';

export default class Comment {
  static get defaults() {
    return {
      children: [],
      parent: null,
      points: 0,
      post: null,
      user: null,
      via: ''
    };
  }

  constructor(comment) {
    // load defaults
    this._children = Comment.defaults.children;
    this._parent   = Comment.defaults.parent;
    this._points   = Comment.defaults.points;
    this._post     = Comment.defaults.post;
    this._postDate = Date.now();
    this._user     = Comment.defaults.user;
    this._via      = Comment.defaults.via;

    // store passed in information.
    // I did it this way because all of my set methods
    // check to make sure that values are valid before
    // saving them.
    this.children = comment.children;
    this.parent   = comment.parent;
    this.points   = comment.points;
    this.post     = comment.post;
    this.postDate = comment.postDate;
    this.user     = comment.user;
    this.via      = comment.via;

    if (comment.save === true) {
      this.save();
    }
  }

  /* get children
  *  return: A Comment Array of replies to this Comment. Will
  *    return an empty Array if isThread === false;
  */
  get children() {
    return this._children || Comment.defaults.children;
  }
  /* get isOp
  *  return: True if Comment is the top level of a Comment thread.
  *    (ie) if the Comment is a reply directly to a Post and not
  *    another thread.
  *    Note, the OP in this context is not necessarily the user who
  *    posted the image. It is someone who replied directly to the
  *    Post.
  */
  get isOP() {
    return this.parent.length == null;
  }
  /* get isReply
  *  return: True if Comment is a reply to another Comment.
  */
  get isReply() {
    return this.parent != null;
  }
  /* get isThread
  *  return: True if Comment is the beginning of a Comment thread.
  *    Will return true even if the Comment is not the OP.
  *    (ie) the Comment is a part of a thread and has had other
  *    people reply to it, starting a thread within the original
  *    Comment thread.
  */
  get isThread() {
    return this.children.length > 0;
  }
  /* get parent
  *  return: The Comment that this Comment is replying to, or null
  *    if this Comment is replying directly to the Post.
  */
  get parent() {
    return this._parent || Comment.defaults.parent;
  }
  /* get points
  *  return: The number of upvotes the Comment has received.
  */
  get points() {
    return this._points || Comment.defaults.points;
  }
  /* get post
  *  return: A Post object representing the Post the Comment
  *    was made in.
  */
  get post() {
    return this._post || Comment.defaults.post;
  }
  /* get postDate
  *  return: A Date object representing the Date the Comment
  *    was posted.
  */
  get postDate() {
    return this._postDate;
  }
  /* get user
  *  return: A User object associated with the commenter.
  */
  get user() {
    return this._user || Comment.defaults.user;
  }
  /* get via
  *  return: A String identifying the platform the user
  *    posted the Comment on. (ie) 'Desktop', 'Android', etc.
  *    Returns an empty String if unknown.
  */
  get via() {
    return this._via || Comment.defaults.via;
  }

  set children(children) {
    if (this._children === Comment.defaults.children && Array.isArray(children))
      this._children = children;
  }
  set isOP(isOP) {
    // This makes it so the value can't be changed.
    return;
  }
  set isReply(isReply) {
    // This makes it so the value can't be changed.
    return;
  }
  set isThread(isThread) {
    // This makes it so the value can't be changed.
    return;
  }
  set parent(parent) {
    if (parent instanceof Comment)
      this._parent = parent;
    else if (parent == null)
      this._parent = null;
  }
  set points(points) {
    if (typeof points === 'number' && points % 1 === 0)
      this._points = points;
  }
  set post(post) {
    if (this._post === Comment.defaults.post && post instanceof Post)
      this._post = post;
  }
  set postDate(date) {
    if (date instanceof Date)
      this._postDate = date;
  }
  set user(user) {
    if (this._user === Comment.defaults.user && user instanceof User)
      this._user = user;
  }
  set via(via) {
    if (typeof via === 'string')
      this._via = via;
  }

  delete() {

  }
  save() {

  }
}
