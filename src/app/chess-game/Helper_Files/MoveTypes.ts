import { HandleEvents } from "./HandleEvents";
import { $,$$,$$$, Clone } from "./ShortMethod";
import { RenderPieces } from './RenderPieces';

export const MoveTypes = {

  MakeMove(move : any,chess : any){
    // console.log("Inside Make Moves");
    // console.log(move.flags)
    // console.log(chess.ascii());

    if (chess.game_over()) {
      console.log("Here Game is over");
      return ;
    }

    if (move.flags === 'n') {
      this.NonCapture(move,chess);
    }
    else if (move.flags === 'b') {
      this.PawnPushTwoSquares(move,chess);
    }
    else if (move.flags === 'e') {
      this.EnPassantCapture(move,chess);
    }
    else if (move.flags === 'c') {
      this.StandardCapture(move,chess);
    }
    else if (move.flags === 'p') {
      this.Promotion(move,chess);
    }
    else if (move.flags === 'k') {
      this.KingSideCastling(move,chess);
    }
    else if (move.flags === 'q') {
      this.QueenSideCastling(move,chess);
    }

  },

  NonCapture(move : any,chess : any){
    // console.log(flags);
    chess.move(move);

    var ele : HTMLDivElement = $(`#${move.from}`);
    var img_element = $$$(ele,'img');

    // console.log("Non Capture");
    if (img_element === null) {
      return;
    }
    img_element.remove();
    // console.log("Non Capture Happened");

    img_element.setAttribute('piece-position',move.to);
    $(`#${move.to}`).append(img_element);
    // $(`#${move.to}`).addEventListener('click',HandleEvents.ClickEvent(img_element,chess));
    $$('.Possible_Square').forEach( (element : any) => {
      element.classList.remove('Possible_Square');
    })
  },

  PawnPushTwoSquares(move : any,chess : any){
    chess.move(move);
    var ele : HTMLDivElement = $(`#${move.from}`);
    var img_element = $$$(ele,'img');
    // console.log("Pawn Push")
    if (img_element === null) {
      return;
    }
    img_element.remove();
    // console.log("Pawn Push Happened")
    img_element.setAttribute('piece-position',move.to);
    $(`#${move.to}`).append(img_element);
    $$('.Possible_Square').forEach( (element : any) => {
      element.classList.remove('Possible_Square');
    })
  },

  EnPassantCapture(move : any,chess : any){
    chess.move(move);
    // console.log(move.from);
    var str : string = move.to;
    var old_position = str[0] +  (Number(str[1]) - 1).toString();
    $$$($(`#${old_position}`),'img').remove();
    var img_element = $$$($(`#${move.from}`),'img');
    img_element.remove();
    $(`#${move.to}`).append(img_element);
    $$('.Possible_Square').forEach( (element : any) => {
      element.classList.remove('Possible_Square');
    });
    // HandleEvents.removeEvent(move,move.to);
  },

  StandardCapture(move : any,chess : any){
    chess.move(move);
    var PieceWhoseMoveitis = move.from;
    var PieceTobecaptured = move.to;

    var img_element = ($$$($(`#${PieceWhoseMoveitis}`),'img'));
    img_element.remove();

    img_element.setAttribute('piece-position',move.to);
    ($$$($(`#${PieceTobecaptured}`),'img').remove());

    $(`#${PieceTobecaptured}`).append(img_element);
    $$('.Possible_Square').forEach( (element : any) => {
      element.classList.remove('Possible_Square');
    })

    $(`#${move.to}`).replaceWith(Clone($(`#${move.to}`)));
    RenderPieces.addEventListeners(chess);
  },

  Promotion(move : any,chess : any){

  },

  KingSideCastling(move : any,chess : any){
    chess.move(move);
    // console.log(move.to);

    let img_element_king = $$$($(`#${move.from}`),'img');
    img_element_king.append();

    var ascii_value = move.to.charCodeAt(0) - 1;
    var rook__new_position = String.fromCharCode(ascii_value) + move.to[1];

    let img_element_rook;
    // let curr;
    for(let i = 1; i <= 8; i++){
      let curr = String.fromCharCode(move.from.charCodeAt(0) + i) + move.to[1];
      img_element_rook = $$$($(`#${curr}`),'img');
      if (img_element_rook !== null && img_element_rook.getAttribute('piece-type')[1] === 'R') {
        break;
      }
    }
    img_element_rook.remove();

    // console.log(img_element_rook);
    img_element_rook.setAttribute('piece-position',rook__new_position)
    $(`#${rook__new_position}`).append(img_element_rook);
    $(`#${move.to}`).append(img_element_king);
    // console.log(rook_position);

    $$('.Possible_Square').forEach( (element : any) => {
      element.classList.remove('Possible_Square');
    })

    $(`#${move.to}`).replaceWith(Clone($(`#${move.to}`)));
    RenderPieces.addEventListeners(chess);
  },

  QueenSideCastling(move : any,chess : any){
    chess.move(move);

    let  img_element_king = $$$($(`#${move.from}`),'img');
    img_element_king.append();

    var ascii_value = move.to.charCodeAt(0) + 1;
    var rook__new_position = String.fromCharCode(ascii_value) + move.to[1];

    let img_element_rook;
    for(let i = 1; i <= 8; i++){
      let curr = String.fromCharCode(move.from.charCodeAt(0) - i) + move.to[1];
      img_element_rook = $$$($(`#${curr}`),'img');
      if (img_element_rook !== null && img_element_rook.getAttribute('piece-type')[1] === 'R') {
        break;
      }
    }
    img_element_rook.remove();

    img_element_rook.setAttribute('piece-position',rook__new_position)
    $(`#${rook__new_position}`).append(img_element_rook);
    $(`#${move.to}`).append(img_element_king);
    // console.log(rook_position);

    $$('.Possible_Square').forEach( (element : any) => {
      element.classList.remove('Possible_Square');
    })

    $(`#${move.to}`).replaceWith(Clone($(`#${move.to}`)));
    RenderPieces.addEventListeners(chess);

  }

}
