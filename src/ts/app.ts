import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

// Annotation section
@Component({
	selector: 'my-app'
})
@View({
	template: '<h1>Hello {{ name }}</h1>'
})
// Component controller
export class BaseComponent {
	name: string;
	constructor() {
		this.name = 'Alice!';
	}
}