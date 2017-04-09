import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class HomeService{

	constructor(@Inject(Http) private http: Http){
		
	}

    queryByKeyWord(keyWord:string): Observable<any> {
		return this.http.post('/server/homeService!queryByKeyWord',{keyWord:keyWord})
		.map(res => res.json()).do(data=>{
			
		})
		.catch(error => {
			return Observable.throw(error.json());
		});
    }
	 queryByParam(params): Observable<any> {
		return this.http.post('/server/homeService!queryByParam',params)
		.map(res => res.json()).do(data=>{
			
		})
		.catch(error => {
			return Observable.throw(error.json());
		});
    }
    
	saveEntity(home): Observable<any> {
		return this.http.post('/server/homeService!saveEntity',home)
		.map(res => res.json()).do(data=>{
			
		})
		.catch(error => {
			return Observable.throw(error.json());
		});
    }

}