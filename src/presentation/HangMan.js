import React from "react";
import lost from "../assets/lost.gif";
import win from "../assets/victory.gif";
import HangManContainer from "../container/hangman.container";
import { keyboard } from "../description/alphabet";
import { images } from "../description/images";
import { wordList } from "../description/wordList";
import { compareTwoArray } from "../utils";

const HangMan = () => {
  const {
    clickHandler,
    restartHandler,
    currentMove,
    word,
    rightGuess,
    index,
    gameOver,
    buttonDisable,
  } = HangManContainer();
  return (
    <div>
      <h1>Hangman</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <img src={images[currentMove]} alt="" />
        </div>
        <div>
          {word.map((char, index) => (
            <input key={index} disabled value={rightGuess[index] ?? ""} />
          ))}
          <div style={{ margin: 20 }}>Hint :- {wordList[index].hint}</div>
          <h3>Move :- {currentMove}/6</h3>
          {keyboard.map((ele, index) => {
            return (
              <div key={index}>
                {ele.map((char, index) => {
                  return (
                    <button
                      key={index}
                      onClick={clickHandler}
                      disabled={buttonDisable(char)}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            );
          })}
          <button
            style={{ padding: 5, width: "auto" }}
            onClick={restartHandler}
          >
            Restart
          </button>
        </div>
      </div>
      {gameOver && (
        <>
          <h1>
            <img src={lost} alt="lost" style={{ width: 40, marginTop: 5 }} />{" "}
            You Lost.
          </h1>
          <h3>Word :- {wordList[index].word}</h3>
        </>
      )}
      {compareTwoArray(rightGuess, word) && (
        <h1>
          <img src={win} alt="win" style={{ width: 40, marginTop: 5 }} /> You
          Win.
        </h1>
      )}
    </div>
  );
};

export default HangMan;
