import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { MainScreenDialogComponent } from './home-page/main-screen-dialog/main-screen-dialog.component';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { ResultDialogComponent } from './chess-game/result-dialog/result-dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainScreenDialogComponent,
    ResultDialogComponent,
    ChessGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
