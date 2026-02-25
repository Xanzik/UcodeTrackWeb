export class PostBlockDTO {
	constructor(post) {
		this.id = post.id;
		this.status = 'inactive';
		this.isBlocked = true;
	}
}

// export class UpdatePostDTO {
// 	constructor(Post) {
// 		this.id = Post.id;
// 		if (Post.content !== undefined) this.content = Post.content;
// 		if (Post.status !== undefined) this.status = Post.status;
// 	}
// }
