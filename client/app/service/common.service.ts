import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class KeyWordService{
// for change the navbar state between online and offline
	private keyWork = new Subject<string>();
	keyWork$ = this.keyWork.asObservable();
	
	changeKey(key){
		this.keyWork.next(key);
	}

}