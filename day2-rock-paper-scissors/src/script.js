const MAX_PLAY = 10;

const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const leftCount = document.getElementById("left-count");
const resultText = document.getElementById("result");
const selectZone = document.querySelector(".select");

const getRandomHand = () => {
  return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
};

const getResult = (playerHand, computerHand) => {
  if (playerHand === computerHand) return "draw";

  if (
    (playerHand === "Rock" && computerHand === "Scissors") ||
    (playerHand === "Paper" && computerHand === "Rock") ||
    (playerHand === "Scissors" && computerHand === "Paper")
  )
    return "win";

  return "lose";
};

const getFinalResult = ({ winCount, loseCount }) => {
  if (winCount === loseCount) return "Final result: DRAW!";
  return winCount > loseCount ? "Final result: WIN!" : "Final result: LOSE!";
};

const displayFinalResult = () => {
  [...selectZone.children].forEach((child) => {
    child.classList.toggle("hidden", !child.classList.contains("replay-btn"));
  });
  resultText.textContent = getFinalResult(scoreBoard());
};

const createScoreBoard = () => {
  let totalCount = 0;
  let winCount = 0;
  let loseCount = 0;

  return (result) => {
    if (MAX_PLAY <= totalCount) return { totalCount, winCount, loseCount };

    totalCount++;
    result === "win" && winCount++;
    result === "lose" && loseCount++;

    return { totalCount, winCount, loseCount };
  };
};

const replay = () => {
  scoreBoard = createScoreBoard(); //스코어 보드 초기화
  [...selectZone.children].forEach((child) => {
    child.classList.toggle("hidden", child.classList.contains("replay-btn"));
  });

  resultText.textContent = "";
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  leftCount.textContent = MAX_PLAY;
};

const handleClick = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  if (e.target.classList.contains("replay-btn")) {
    replay();
    return;
  }

  const result = getResult(e.target.textContent, getRandomHand());
  const { totalCount, winCount, loseCount } = scoreBoard(result);

  resultText.textContent = `${result}!`;
  playerScore.textContent = winCount;
  computerScore.textContent = loseCount;
  leftCount.textContent = MAX_PLAY - totalCount;

  if (totalCount >= MAX_PLAY) displayFinalResult();
};

let scoreBoard = createScoreBoard();
selectZone.addEventListener("click", handleClick);
