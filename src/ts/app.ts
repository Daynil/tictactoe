import { Component, View } from 'angular2/core';

@Component({
	selector: 'my-app'
})
@View({
	template: '<h1>Hello {{ name }}</h1>'
})
export class BaseComponent {
	name: string;
	constructor() {
		this.name = 'Alice!';
	}
}