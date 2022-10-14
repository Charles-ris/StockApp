import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "./views/home/home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SentimentComponent} from "./views/sentiment/sentiment.component";
import {DatePipe} from "@angular/common";
import {StockComponent} from "./views/shared/stock/stock.component";
import {StockFormComponent} from "./views/shared/stockForm/stock-form.component";
import {LoaderComponent} from "./views/shared/loader/loader.component";

@NgModule({
  declarations: [
    HomeComponent,
    SentimentComponent,
    StockComponent,
    StockFormComponent,
    LoaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
