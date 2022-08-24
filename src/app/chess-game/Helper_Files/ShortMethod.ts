export const $ = (query : any) => document.querySelector(query);

export const $$ = (query : any) => document.querySelectorAll(query);

export const $$$ = (element : any,query : any) => element.querySelector(query);

export const Clone = (node : HTMLElement) => node.cloneNode(true);
