import { ChessConfig } from './Config/ChessConfig';
import { $, $$, $$$, Clone} from './ShortMethod';
import { MoveTypes } from './MoveTypes';
import { RenderPieces } from './RenderPieces';
import { io } from 'socket.io-client';

const socket = io();
export const HandleEvents = {

  // Fires when mouse button is pressed down
  MousedownEvent(element : any, chess : any){

  },

  // Fires when mouse button is released
  MouseUpEvent(element : any, chess : any) {

  },

  // Fires when something is Clicked. Whole cycle of MouseDown MouseUp
  ClickEvent(element : any, chess : any) {
      // console.log("Inside Click Events")
      $$('.Possible_Square').forEach( (element : any) => {
        element.classList.remove('Possible_Square');
      })
      // $('.Possible_Square').forEach((element => {
      //   $element.replaceWith(Clone(element));
      // }))

      var position = element.getAttribute('piece-position');
      const moves = chess.moves(
        {square : position,verbose : true}
      );
      // console.log(moves);
      moves.forEach((move : any)=> {

        $(`#${move.to}`).replaceWith(Clone($(`#${move.to}`)));

        $(`#${move.to}`).classList.add('Possible_Square')
        $(`#${move.to}`).addEventListener('click',() => {
          // console.log(`#${move.to}` + 'click event executed to this element. i . e target position');
          MoveTypes.MakeMove(move,chess);

          socket.emit('MoveMade', move);
          // this.removeEvent(moves,move.to);
        });
      });
  },

  removeEvent(moves : any,to : any){

    moves.forEach( (move : any) => {
      if (move.to !== to) {
        // console.log(move.to + ' All events removed');
        $(`#${move.to}`).replaceWith(Clone($(`#${move.to}`)));
      }
    })
  },


  // Fires when something is clicked Twice in rapid succession
  DblClickEvent(element : any, chess : any) {

  },

  // Fires when a mouse starts to hover over an element. No Bubble
  MouseEnterEvent(element : any, chess : any) {

  },

  // Fires when a mouse exits while hovering over an element. No Bubble
  MouseLeaveEvent(element : any, chess : any) {

  },

  // Fires when mouse is hovering over some element.
  MouseOverEvent(element : any, chess : any) {

  },

  // Fires when mouse leaves from hovering over some element.
  MouseOutEvent(element : any, chess : any) {

  },

  // Fires when the mouse moves.
  MouseMoveEvent(element : any, chess : any) {

  },

  // Fires when the mouse right button is clicked
  ContextmenuEvent(element : any, chess : any) {

  }

}
