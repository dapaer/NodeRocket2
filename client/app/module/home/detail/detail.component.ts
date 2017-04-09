import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';

import {HomeService } from '../service/home.service';

@Component({
    selector: 'detail',
    template: `
        <div class="padder-v-sm padder-sm">
            <h2>home数据展示</h2>
            <p>{{entity.name}}({{entity.num}})
            <br>
            {{entity.content}}</p>
            <button (click)="goBack()">返回</button>
        </div>
    `
})
export class DetailComponent implements OnInit {
    id:number;
    entity:any = {};

    constructor( public _route: ActivatedRoute, public _router: Router,private homeService:HomeService) {
    }

    goBack(){
        this._router.navigate(['/home',{a:1,b:2}]);
    }
    ngOnInit() { 
        this._route.params.map(p => p['id']).subscribe(params => {
            console.log('detial',params)
            this.id = params
             this.homeService.queryByParam({_id:params}).subscribe(
                 data=>{
                    this.entity = data.obj[0];
                 }
             )
        })

       
    }

}