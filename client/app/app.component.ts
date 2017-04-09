import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {KeyWordService} from './service/common.service';

@Component({
    selector: 'my-app',
    styles: [
        `
        a{
            text-decoration: none;
            margin-right: 20px;
            padding: 5px 10px;
            border-bottom: 1px solid transparent;
        }

        a.active {
            border-color: pink
        }

        .content {
            box-sizing: border-box;
            margin: 20px auto;
            width: 70vw;
            padding: 30px
        }
        `
    ],
    templateUrl:'./app.component.html',
})
export class AppComponent {
    name = 'Angular';
    constructor( @Inject(ActivatedRoute) public _route: ActivatedRoute,public keyWordService:KeyWordService) {
        console.log(this._route)
    }
    searchKey;
    search(){
        this.keyWordService.changeKey(this.searchKey);
    }

}
