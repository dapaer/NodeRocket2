import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { contactComponent } from './module/contact/contact.component';
import { rootRouterConfig } from './app.router';

import {KeyWordService} from './service/common.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [AppComponent, contactComponent],
  bootstrap: [AppComponent],
  providers:[KeyWordService]
})
export class AppModule {
}
