import { bootstrap } from 'angular2/platform/browser';
import { CORE_DIRECTIVES } from 'angular2/common';
import { BaseComponent } from './app';

bootstrap(BaseComponent, [CORE_DIRECTIVES])
	.then(
		success => console.log("bootstrapping success: ", success),
		error => console.log("bootstrapping error: ",  error)
	);