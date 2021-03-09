import { INVALID_MOVE } from 'boardgame.io/core';
// var randomWords = require('random-words');
import randomWords from 'random-words';

// v = 0.1
export const WordWarriors = {
    setup: () => ({ 
        player0word: "",
        player0guesses: Array(26).fill(false),
        player1word: "",
        player1guesses: Array(26).fill(false)
    }),
  
    turn: {
      moveLimit: 1,
    },
    
    moves: {
      // guessLetter: (G, ctx, id) => {
      //   G.cells[id] = ctx.currentPlayer;
      // },
      makeWord: (G, ctx, word) => {
        if (ctx.turn <= 2) {
          if (ctx.currentPlayer === "0") {
            G.player0word = word;
          } else {
            G.player1word = word;
          }
        } else {
          return INVALID_MOVE;
        }
      },

      guessLetter: (G, ctx, letter) => {
        if (ctx.turn <= 2) {
          return INVALID_MOVE
        }
        if (ctx.currentPlayer === "0") {
          G.player0guesses[letter.charCodeAt(0) - 97] = true;
        } else {
          G.player1guesses[letter.charCodeAt(0) - 97] = true;
        }
      },
    },
    endIf: (G, ctx) => {
      if (ctx.currentPlayer === "0") {
        if (IsVictory(G.player1word, G.player0guesses, ctx)) {
          return {winner: ctx.currentPlayer};
        }
      } else {
        if (IsVictory(G.player0word, G.player1guesses, ctx)) {
          return {winner: ctx.currentPlayer};
        }
      }
      console.log(randomWords(1));
    },
    
    // The ai can be made by importing a txt file with the entire dictionary 
    // and then choosing a random word.
    // Thankfully, there's already an npm library for that.

    
    
    // ai: {
    //   enumerate: (G, ctx) => {
    //     if (ctx.turn <= 2) {
    //       // let moves = [];
    //       // for (let i = 0; i < 9; i++) {
    //       //   if (G.cells[i] === null) {
    //       //     moves.push({ move: 'clickCell', args: [i] });
    //       //   }
    //       // }
    //     }
        
    //   return null;
    //   },
    // },
  };

// Return true if current player has guessed all the letters in opponent's word.
function IsVictory(word, letters, ctx) {
  if (ctx.turn <= 2) {
    return false;
  }
  for (var i = 0; i < word.length; i++) {
    if (letters[word.charCodeAt(i) - 97] === false) {
      return false;
    }
  }

  return true;
}