import { useEffect, useState } from "react";
import { RANDOM_NUMBER_RANGE, TOTAL_MOVE } from "../constant";
import { wordList } from "../description/wordList";

const HangManContainer = () => {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * RANDOM_NUMBER_RANGE)
  );
  const [word, setWord] = useState(wordList[index].word);
  const [rightGuess, setRightGuess] = useState([]);
  const [wrongGuess, setWrongGuess] = useState("");

  const clickHandler = (e) => {
    const { innerText } = e.target;
    const rightGuessClone = [...rightGuess];

    for (let index in word) {
      if (innerText === word[index]) {
        rightGuessClone[index] = word[index];
      }
    }

    if (!word.includes(innerText)) {
      return setWrongGuess((prev) => prev + innerText);
    }
    setRightGuess(rightGuessClone);
  };

  useEffect(() => {
    setWord(wordList[index].word);
  }, [index]);

  const restartHandler = () => {
    setIndex(Math.floor(Math.random() * RANDOM_NUMBER_RANGE));
    setRightGuess([]);
    setWrongGuess("");
  };

  const currentMove = wrongGuess.length;
  const gameOver = currentMove === TOTAL_MOVE;
  const buttonDisable = (value) => {
    return (
      gameOver ||
      rightGuess.includes(value) ||
      wrongGuess.includes(value) ||
      word === rightGuess.join("")
    );
  };
  return {
    clickHandler,
    restartHandler,
    currentMove,
    word,
    rightGuess,
    index,
    gameOver,
    buttonDisable,
  };
};

export default HangManContainer;
