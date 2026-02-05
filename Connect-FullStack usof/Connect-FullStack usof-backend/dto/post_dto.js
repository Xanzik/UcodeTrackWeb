export class PostBlockDTO {
	constructor(post) {
		this.id = post.id;
		this.status = 'inactive';
		this.isBlocked = true;
	}
}

// export class UpdatePostDTO {
// 	constructor(post) {
// 		this.id = post.id;
// 		if (post.content !== undefined) this.content = post.content;
// 		if (post.status !== undefined) this.status = post.status;
// 	}
// }
