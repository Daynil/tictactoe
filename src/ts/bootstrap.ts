import { bootstrap } from 'angular2/platform/browser';
import { BaseComponent } from './app';

bootstrap(BaseComponent)
	.then(
		success => console.log("bootstrapping success: ", success),
		error => console.log("bootstrapping error: ",  error)
	);