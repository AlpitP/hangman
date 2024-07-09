import { useEffect, useState } from "react";
import { wordList } from "../description/wordList";
import { RANDOM_NUMBER_RANGE, TOTAL_MOVE } from "../constant";
import { compareTwoArray } from "../utils";

const HangManContainer = () => {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * RANDOM_NUMBER_RANGE)
  );
  const [word, setWord] = useState(wordList[index].word.split(""));
  const [wrongGuess, setWrongGuess] = useState([]);
  const [rightGuess, setRightGuess] = useState([]);

  const clickHandler = (e) => {
    const { innerText } = e.target;
    const a = [...rightGuess];
    word.forEach((char, index) => {
      if (innerText === char) {
        a[index] = char;
      }
    });

    if (!word.find((char) => char === innerText)) {
      return setWrongGuess((prev) => [...prev, innerText]);
    }

    setRightGuess(a);
  };

  useEffect(() => {
    setWord(wordList[index].word.split(""));
  }, [index]);

  const restartHandler = () => {
    setIndex(Math.floor(Math.random() * RANDOM_NUMBER_RANGE));
    setRightGuess([]);
    setWrongGuess([]);
  };

  const currentMove = wrongGuess.length;
  const gameOver = currentMove === TOTAL_MOVE;
  const buttonDisable = (value) => {
    return (
      gameOver ||
      rightGuess.includes(value) ||
      wrongGuess.includes(value) ||
      compareTwoArray(rightGuess, word)
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
