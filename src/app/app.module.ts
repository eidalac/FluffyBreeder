import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FluffyInteractComponent } from './fluffy-interact/fluffy-interact.component';
import { FluffyBuyComponent } from './fluffy-buy/fluffy-buy.component';

@NgModule({
  declarations: [
    AppComponent,
    FluffyInteractComponent,
    FluffyBuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
