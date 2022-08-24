import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainScreenDialogComponent } from './main-screen-dialog/main-screen-dialog.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  openDialog(url_string : string) {
    this.dialog.open(MainScreenDialogComponent, {
      data: url_string
    });
  }

  ngOnInit(): void {
  }

}
