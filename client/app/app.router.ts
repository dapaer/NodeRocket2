import { Routes } from '@angular/router';

import { AboutModule } from './module/about/about.module';
import { contactComponent } from './module/contact/contact.component';
import { HomeModule } from './module/home/home.module';


import { ListComponent } from './module/home/list/list.component';
import { DetailComponent } from './module/home/detail/detail.component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './module/home/home.module#HomeModule' },
    { path: 'about', loadChildren: './module/about/about.module#AboutModule' },
    { path: 'contact', component: contactComponent },

    { path: 'news', loadChildren: './module/news/news.module#NewsModule' }
];