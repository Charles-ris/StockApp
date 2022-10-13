import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {SentimentComponent} from "./views/sentiment/sentiment.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sentiment/:symbol', component: SentimentComponent },
  { path: 'sentiment', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
