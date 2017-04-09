import { Component, OnInit, OnDestroy} from '@angular/core';
import {HomeService} from '../service/home.service';
import {KeyWordService} from '../../../service/common.service';
@Component({
    selector: 'list',
    styles: [
        `
        a{
            padding: 0 10px;
        }
        a.active{
            color: #fff;
            background: pink
        }
        `
    ],
    templateUrl:'./list.conponent.html'
})
export class ListComponent implements OnInit, OnDestroy {
      

    public homeObj={
        name:"",
        content:"",
        num:1
    }
    keyWorkObserver;
    public homeLis = [];
    constructor(private homeService:HomeService,private keyWordService:KeyWordService) { }
    private queryHomeLisByKeyWord(keyWord:string){
        this.homeService.queryByKeyWord(keyWord).subscribe(data=>{
            this.homeLis = data.obj;
        });
    }

    submit(){
        this.homeService.saveEntity(this.homeObj).subscribe(data=>{
            if(data.success){
                alert('保存成功');
                this.queryHomeLisByKeyWord("");
            }
        });
    }

    ngOnInit() { 
        this.queryHomeLisByKeyWord("");
       this.keyWorkObserver = this.keyWordService.keyWork$.debounceTime(500).distinctUntilChanged().subscribe(
            data=>{
                 this.queryHomeLisByKeyWord(data);
            }
        );
    }

      ngOnDestroy(): void {
            this.keyWorkObserver.unsubscribe();
        }

}