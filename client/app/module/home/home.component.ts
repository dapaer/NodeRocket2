import { Component, SimpleChanges,OnInit,OnChanges,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from ".5.2.0@rxjs/Observable";

@Component({
    selector: 'home',
    styles: [
        `
       
        
        `
    ],
    template: `
        <div class="detail">
            <router-outlet></router-outlet>
        </div>
    `
})
export class HomeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
        ngOnDestroy(): void {
            console.error('ngOnDestroy.');
        }

        ngAfterViewChecked(): void {
            console.error('ngAfterViewChecked.');
        }

        ngAfterViewInit(): void {
            console.error('ngAfterViewInit.');
        }

        ngAfterContentChecked(): void {
            console.error('ngAfterContentChecked.');
        }

        ngAfterContentInit(): void {
            console.error('ngAfterContentInit.');
        }

        ngDoCheck(): void {
            console.error('ngDoCheck.');
        }

        ngOnChanges(changes: SimpleChanges): void {
            console.error('ngOnChanges.');
        }

    heroes: Observable<any>;
    constructor(private route:ActivatedRoute){

    }
    ngOnInit() { 
         console.error('OnInit.');
        this.route.params.map((data)=>{
            console.error(data);
        }).subscribe(data1=>{
            console.error(`data1 ${data1}`);
        });
    }

}