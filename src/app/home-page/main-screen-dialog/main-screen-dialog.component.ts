import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { ChessConfig } from '../../chess-game/Helper_Files/Config/ChessConfig'

@Component({
  selector: 'app-main-screen-dialog',
  templateUrl: './main-screen-dialog.component.html',
  styleUrls: ['./main-screen-dialog.component.scss']
})
export class MainScreenDialogComponent implements OnInit {

  constructor(private router : Router,
    @Inject(MAT_DIALOG_DATA) public data : string,
    public dialogRef : MatDialogRef<MainScreenDialogComponent>) {}

  socket = io().connect();
  Room_Name = '';
  User_Name = '';
  error = "";
  submitted_Once = false;
  isAdmin = false;

  onClick() {
    var ctx = document.querySelector('.error-message');
    ctx?.setAttribute("style","display:none")
    console.log(this.data);
    if (this.Room_Name === '' || this.User_Name === '') {
    this.submitted_Once = true;
    return ;
  }

  this.socket.emit('onClick_JoiningRoom', this.Room_Name, this.User_Name);

  this.socket.on('Result_JoiningRoom', (wasAbleToJoin, isAdmin, room_name) => {
    if (wasAbleToJoin) {
      if (isAdmin) {
      ChessConfig.isPlayingWhite = true;
      ChessConfig.userPlayingColor = 'white';
    }
    else{
      ChessConfig.isPlayingWhite = false;
      ChessConfig.userPlayingColor = 'black';
    }

    this.router.navigateByUrl(this.data);
    this.dialogRef.close();
  }
    else{
      var ctx = document.querySelector('.error-message');
      ctx?.setAttribute("style","display:block")
    }
  })


  }

  ngOnInit(): void {
  }

}
