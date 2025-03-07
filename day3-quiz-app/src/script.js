const MAX_QUIZ = 10;
const questionText = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".next-btn");
const restartBtn = document.querySelector(".restart-btn");

const getData = async () => {
  const response = await fetch("./data.json");
  return response.json();
};

const indexCounter = () => {
  let QuizIdx = -1;
  return () => {
    return ++QuizIdx;
  };
};

const printQuiz = ({ id, question, choices }) => {
  questionText.textContent = `${id}. ${question}?`;
  [...choicesBox.children].forEach(
    (child, idx) => (child.textContent = choices[idx])
  );
};

const printResult = (userChoice, { id, answer }) => {
  [...choicesBox.children].forEach((child) => {
    if (child.textContent === userChoice) child.classList.add("wrong");
    if (child.textContent === answer) child.classList.add("correct");
    child.disabled = true;
  });

  id === MAX_QUIZ
    ? restartBtn.classList.remove("hidden")
    : nextBtn.classList.remove("hidden");
};

const handleClick = (e, answer) => {
  if (e.target.tagName !== "BUTTON") return;
  const userChoice = e.target.textContent;
  printResult(userChoice, answer);
};

const handleNext = () => {
  nextBtn.classList.add("hidden");

  [...choicesBox.children].forEach((child) => {
    child.className = "";
    child.disabled = false;
  });
};

const main = async () => {
  const data = await getData();
  const counter = indexCounter();
  let quiz = data[counter()];

  printQuiz(quiz);

  choicesBox.addEventListener("click", (e) => handleClick(e, quiz));

  nextBtn.addEventListener("click", () => {
    quiz = data[counter()];
    printQuiz(quiz);
    handleNext();
  });

  restartBtn.addEventListener("click", () => {
    location.reload();
  });
};

main();
