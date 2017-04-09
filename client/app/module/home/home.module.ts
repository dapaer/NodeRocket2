import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
// import { ShareModule } from '../share/share.module'

import { RouterConfig } from './home.router'

import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import {HomeService} from './service/home.service';
@NgModule({
  imports: [
    // ShareModule,
    CommonModule,
    RouterModule.forChild(RouterConfig),
    FormsModule
  ],
  declarations: [HomeComponent, ListComponent, DetailComponent],
  exports: [HomeComponent],
  bootstrap: [],
  providers:[HomeService]
})
export class HomeModule { }
