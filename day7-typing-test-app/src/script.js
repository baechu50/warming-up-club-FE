import { ScoreBoard, Text } from "./gameState.js";

const $error = document.getElementById("error");
const $time = document.getElementById("time");
const $accuracy = document.getElementById("accurancy");
const $cpm = document.getElementById("cpm");
const $wpm = document.getElementById("wpm");
const $text = document.getElementById("text");
const $input = document.getElementById("input");
const $retryBtn = document.getElementById("retry-btn");

const getData = async (link) => {
  const response = await fetch(link);
  return response.json();
};

const endTest = () => {
  $time.innerText = 0;
  $retryBtn.classList.remove("hidden");
  $input.disabled = true;
};

const colorText = (textArr, inputArr) => {
  const colorizedText = textArr.map((char, idx) => {
    if (!inputArr[idx]) return char;
    if (char === inputArr[idx]) return `<span class="correct">${char}</span>`;
    if (char !== inputArr[idx]) return `<span class="wrong">${char}</span>`;
  });

  return colorizedText.join("");
};

const handleInput = (e, scoreBoard, text) => {
  const textArr = $text.innerText.split("");
  const inputArr = e.target.value.split("");
  $text.innerHTML = colorText(textArr, inputArr);

  scoreBoard.error = inputArr.reduce(
    (acc, char, idx) => acc + (char !== textArr[idx] ? 1 : 0),
    0
  );

  scoreBoard.count = inputArr.length;

  $error.innerText = scoreBoard.error + scoreBoard.totalError;
  $accuracy.innerText = scoreBoard.calculateAccuracy().toFixed(2) + "%";
  $cpm.innerText = Math.ceil(scoreBoard.calculateCPM());
  $wpm.innerText = Math.ceil(scoreBoard.calculateWPM());

  if (inputArr.length === textArr.length) {
    scoreBoard.totalError += scoreBoard.error;
    scoreBoard.error = 0;

    scoreBoard.totalCount += scoreBoard.count;
    scoreBoard.count = 0;

    $text.innerText = text.getNextText();
    $input.value = "";
  }
};

const main = async () => {
  const data = await getData("./data.json");
  const text = new Text(data);
  const scoreBoard = new ScoreBoard(60);

  scoreBoard.startTimer($time, endTest);
  $text.innerText = text.getNextText();

  $input.addEventListener("input", (e) => handleInput(e, scoreBoard, text));
  $retryBtn.addEventListener("click", () => location.reload());
};

main();
