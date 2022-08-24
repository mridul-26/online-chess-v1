import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'chess',component:ChessGameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
