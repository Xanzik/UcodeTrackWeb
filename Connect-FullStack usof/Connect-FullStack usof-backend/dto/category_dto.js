export class CategoryUpdateDTO {
	constructor(category) {
		this.id = category.id;
		this.title = category.title;
		this.description = category.description;
	}
}
