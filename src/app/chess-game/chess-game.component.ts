import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';
import { RenderPieces } from './Helper_Files/RenderPieces';
import { MoveTypes } from './Helper_Files/MoveTypes';
import { Socket,io } from 'socket.io-client'
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from './result-dialog/result-dialog';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.scss']
})
export class ChessGameComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  socket = io();
  ngOnInit(): void {
    let chess = new Chess();
    this.socket.on('UpdateMove', (move : any) => {
      console.log("asasasdasdasdadasd");
      console.log(move.color)
      MoveTypes.MakeMove(move,chess);
      if (chess.in_checkmate()) {
        if (move.color === 'w') {
          this.dialog.open(ResultDialogComponent,{
            data:'Game has ended. White Won.'
          });
        }
        else{
          this.dialog.open(ResultDialogComponent,{
            data:'Game has ended. Black Won.'
          });
        }
      }
      else if (chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition() || chess.insufficient_material()) {
        this.dialog.open(ResultDialogComponent,{
          data:'Game has ended in a draw'
        });
      }
    })
    RenderPieces.PieceRender(chess);
    if (chess.game_over()) {
      console.log("Game is over 2");
    }
  }

}
