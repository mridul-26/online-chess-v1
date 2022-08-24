import { ChessConfig } from "./Config/ChessConfig"
import { StartPosition } from "./Config/StartPosition";
import { RecentPosition } from "./Config/RecentPosition";
import { PieceImage,PieceType } from "./Config/PieceImageConfig";
import { $,$$,$$$ } from './ShortMethod';
// import { Chess } from "chess.js";
import { HandleEvents } from "./HandleEvents";

export const RenderPieces = {
  PieceRender(chess : any) {
    // chess.move('e4')
    // console.log(chess);
    // console.log(chess.get('a2'));
    // console.log(chess.moves(
    //   {square : 'a2'}
    // ))
    // console.log($('#a3').style.backgroundColor = 'black');
    const gameSetup = (ChessConfig.initialGame) ? StartPosition : RecentPosition;

    this.assignPiecesToPosition(gameSetup);
    this.PlayingWhat();
    this.addEventListeners(chess);
  },

  assignPiecesToPosition(gameSetup: any){
    const arr : any = PieceImage;
    const piecetype : any = PieceType;
    for (const position_id in gameSetup) {
      const Piece_At_Position = gameSetup[position_id];
      const img_element = document.createElement('img');
      img_element.src = arr[Piece_At_Position];
      img_element.setAttribute('piece-type',Piece_At_Position);
      img_element.setAttribute('piece-color',piecetype[Piece_At_Position]);
      img_element.setAttribute('piece-position',position_id);
      img_element.style.width = '60px';
      img_element.style.height = '60px';
      img_element.style.cursor = 'pointer';
      const PieceBox = $(`#${position_id}`);
      PieceBox.append(img_element);
    }
  },

  PlayingWhat(){
    if (!ChessConfig.isPlayingWhite) {
      $(ChessConfig.ChessBoardSelector).style.flexDirection = 'column';
    }
    else{
      $(ChessConfig.ChessBoardSelector).style.flexDirection = 'column-reverse';
    }
  },

  addEventListeners(chess : any){
    $$('img').forEach( (element : HTMLImageElement) => {
      if (ChessConfig.isPlayingWhite) {
        if (element.getAttribute('piece-color') === 'white') {
          element.addEventListener('click', (e : Event) => {
            // console.log("Inside RenderPieces HandleEvents.ClickEvent initiated");
            HandleEvents.ClickEvent(element,chess);
          })
        }
      }
      else
      {
        if (element.getAttribute('piece-color') === 'black') {
          element.addEventListener('click', (e : Event) => {
            // console.log("Inside RenderPieces HandleEvents.ClickEvent initiated");
            HandleEvents.ClickEvent(element,chess);
          })
        }
      }
    })
  }

}
