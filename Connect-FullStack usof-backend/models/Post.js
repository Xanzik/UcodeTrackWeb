class Post {
    constructor(id, author, title, publishDate, status, content, categoryIds) {
      this.id = id;
      this.author = author;
      this.title = title;
      this.publishDate = publishDate;
      this.status = status;
      this.content = content;
      this.categoryIds = categoryIds;
    }
  }

module.exports = Post;
