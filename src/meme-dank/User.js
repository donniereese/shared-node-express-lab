export default class User {
  static get defaults() {
    return {
      bio: '',
      comments: [],
      favorites: [],
      notoriety: '',
      posts: [],
      reputation: '',
      trophies: [],
      username: '$$unknown_user$$'
    };
  }

  constructor(user) {
    // load defaults
    this._bio        = User.defaults.bio;
    this._comments   = User.defaults.comments;
    this._favorites  = User.defaults.favorites;
    this._joinDate   = Date.now();
    this._notoriety  = User.defaults.notoriety;
    this._posts      = User.defaults.posts;
    this._reputation = User.defaults.reputation;
    this._trophies   = User.defaults.trophies;
    this._username   = User.defaults.username;

    // store passed in information.
    // I did it this way because all of my set methods
    // check to make sure that values are valid before
    // saving them.
    this.bio        = user.bio;
    this.comments   = user.comments;
    this.favorites  = user.favorites;
    this.joinDate   = user.joinDate;
    this.notoriety  = user.notoriety;
    this.posts      = user.posts;
    this.reputation = user.reputation;
    this.trophies   = user.trophies;
    this.username   = user.username;

    if (user.save === true) {
      this.save();
    }
  }

  /* get bio
  *  return: A String object representing the bio the User created.
  */
  get bio() {
    return this._bio || User.defaults.bio;
  }
  /* get comments
  *  return: A Comment Array of all the comments the User has made.
  */
  get comments() {
    return this._comments || User.defaults.comments;
  }
  /* get favorites
  *  return: A Post Array of all the posts the User has favorited.
  */
  get favorites() {
    return this._favorites || User.defaults.favorites;
  }
  /* get favourites
  *  return: A Post Array of all the posts the User has favorited.
  */
  get favourites() {
    return this.favorites;
  }
  /* get joinDate
  *  return: A Date object representing the Date the User created their
  *    account.
  */
  get joinDate() {
    return this._joinDate;
  }
  /* get notoriety
  *  return: A String object representing the User's notoriety level.
  */
  get notoriety() {
    return this._notoriety || User.defaults.notoriety;
  }
  /* get posts
  *  return: A Post Array of all the posts the User has made.
  */
  get posts() {
    return this._posts || User.defaults.posts;
  }
  /* get reputation
  *  return: An integer representing the User's reputation.
  */
  get reputation() {
    return this._reputation || User.defaults.reputation;
  }
  /* get trophies
  *  return: ---Not Implemented---
  */
  get trophies() {
    return this._trophies || User.defaults.trophies;
  }
  /* get username
  *  return: A String object representing the User's username.
  */
  get username() {
    return this._username || User.defaults.username;
  }

  set bio(text) {
    if (typeof text === 'string')
      this._bio = text;
  }
  set comments(comments) {
    if (this._comments === User.defaults.comments && Array.isArray(comments))
      this._comments = comments;
  }
  set favorites(favorites) {
    if (this._favorites === User.defaults.favorites && Array.isArray(favorites))
      this._favorites = favorites;
  }
  set favourites(favourites) {
    this.favorites = favourites;
  }
  set joinDate(date) {
    if (date instanceof Date)
      this._postDate = date;
  }
  set notoriety(notoriety) {
    if (typeof notoriety === 'number' && notoriety % 1 === 0)
      this._notoriety = notoriety;
  }
  set posts(posts) {
    if (this._posts === User.defaults.posts && Array.isArray(posts))
      this._posts = posts;
  }
  set reputation(reputation) {
    if (typeof reputation === 'number' && reputation % 1 === 0)
      this._reputation = reputation;
  }
  set trophies(trophies) {
    if (Array.isArray(trophies))
      this._trophies = trophies;
  }
  set username(username) {
    if (typeof username === 'string')
      this._username = username;
  }

  delete() {

  }
  save() {

  }
}
