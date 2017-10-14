import User from './User';

export default class Post {
  static get defaults() {
    return {
      comments: [],
      images: [],
      points: 0,
      tags: [],
      title: '',
      type: '',
      user: null,
      via: '',
      views: 0
    };
  }

  constructor(post) {
    // load defaults
    this._comments    = Post.defaults.comments;
    this._images      = Post.defaults.images;
    this._points      = Post.defaults.points;
    this._postDate    = Date.now();
    this._tags        = Post.defaults.tags;
    this._title       = Post.defaults.title;
    this._type        = Post.defaults.type;
    this._user        = Post.defaults.user;
    this._via         = Post.defaults.via;
    this._views       = Post.defaults.views;

    // store passed in information.
    // I did it this way because all of my set methods
    // check to make sure that values are valid before
    // saving them.
    this.comments    = post.comments;
    this.images      = post.images;
    this.points      = post.points;
    this.postDate    = post.postDate;
    this.tags        = post.tags;
    this.title       = post.title;
    this.type        = post.type;
    this.user        = post.user;
    this.via         = post.via;
    this.views       = post.views;

    if (post.save === true) {
      this.save();
    }
  }

  /* get comments
  *  return: A Comment Array of all the comments replying directly
  *    to the Post. Does not contain comments within comments.
  */
  get comments() {
    return this._comments;
  }
  /* get contents
  *  return: A String object representing the description that the
  *    User specified for the Post.
  */
  get contents() {
    if (this.image)
      return this.image.description;
    return null;
  }
  /* get image
  *  return: A String of the path to the image.
  */
  get image() {
    return this.images.length > 0 ? this.images[0] : null;
  }
  /* get images
  *  return: A Image Array of all the images in the post.
  */
  get images() {
    return this._images;
  }
  /* get points
  *  return: The number of upvotes the Post has received.
  */
  get points() {
    return this._points;
  }
  /* get postDate
  *  return: A Date object representing the Date the Post
  *    was created.
  */
  get postDate() {
    return this._postDate;
  }
  /* get tags
  *  return: A String Array of the tags specified by the poster.
  */
  get tags() {
    return this._tags;
  }
  /* get title
  *  return: A String object representing the title the User set
  *    for the Post.
  */
  get title() {
    return this._title;
  }
  /* get type
  *  return: A String object representing the type of the Post.
  *    (ie) 'image', 'album'
  */
  get type() {
    return this._type;
  }
  /* get user
  *  return: A User object associated with the poster.
  */
  get user() {
    return this._user;
  }
  /* get via
  *  return: A String identifying the platform the user
  *    created the Post on. (ie) 'Desktop', 'Android', etc.
  *    Returns an empty String if unknown.
  */
  get via() {
    return this._via;
  }
  /* get views
  *  return: An integer representing the number of times the post has
  *    been seen.
  */
  get views() {
    return this._views;
  }

  set comments(comments) {
    if (this._comments === Post.defaults.comments && Array.isArray(comments))
      this._comments = comments;
  }
  set image(image) {
    if (typeof image === 'string')
      this._images[0] = image;
  }
  set images(images) {
    if (Array.isArray(images))
      this._images = images;
  }
  set points(points) {
    if (typeof points === 'number' && points % 1 === 0)
      this._points = points;
  }
  set postDate(date) {
    if (date instanceof Date)
      this._postDate = date;
  }
  set tags(tags) {
    if (Array.isArray(tags))
      this._tags = tags;
  }
  set title(title) {
    if (typeof title === 'string')
      this._title = title;
  }
  set type(type) {
    if (typeof type === 'string')
      this._type = type;
  }
  set user(user) {
    if (this._user === Post.defaults.user && user instanceof User)
      this._user = user;
  }
  set via(via) {
    if (typeof via === 'string')
      this._via = via;
  }
  set views(views) {
    if (typeof views === 'number' && views % 1 === 0)
      this._views = views;
  }

  delete() {

  }
  save() {

  }
}

class Image {
  constructor(image) {
    this._description = image.description;
    this._path = image.path;
  }
  /* get description
  *  return: A String object representing the description that the
  *    User specified for the Post.
  */
  get description() {
    return this._description;
  }
  get path() {
    return this._path;
  }

  set description(description) {
    this._description = description;
  }
  set path(path) {
    this._path = path;
  }


}

const types = {
  animated: 'animated',
  album: 'album',
  image: 'image'
}

export types;
