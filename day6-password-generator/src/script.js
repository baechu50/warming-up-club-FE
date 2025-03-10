const generateAsciiRange = (start, count) => {
  return Array.from({ length: count }, (_, i) => start + i);
};

const getRandomChar = (rangeArr) => {
  return String.fromCharCode(
    rangeArr[Math.floor(Math.random() * rangeArr.length)]
  );
};

const getPassword = (length, rangeArr) => {
  const password = [];

  while (length--) {
    password.push(getRandomChar(rangeArr));
  }

  return password.join("");
};

const printPassword = (password) => {
  document.getElementById("password").innerText = password;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const length = document.getElementById("length").value || 5;
  const rangeArr = [];

  document.getElementById("small").checked && rangeArr.push(...asciiNumSmall);
  document.getElementById("big").checked && rangeArr.push(...asciiNumBig);
  document.getElementById("number").checked && rangeArr.push(...asciiNum);
  document.getElementById("symbols").checked && rangeArr.push(...asciiSpecial);

  printPassword(getPassword(length, rangeArr));
};

const handleCopy = () => {
  const password = document.getElementById("password").innerText;
  password && navigator.clipboard.writeText(password);
};

const asciiNumSmall = generateAsciiRange(97, 26); // a-z
const asciiNumBig = generateAsciiRange(65, 26); // A-Z
const asciiNum = generateAsciiRange(48, 10); // 0-9
const asciiSpecial = [64, 33, 35, 38, 37]; // 특수 문자

const submitBtn = document.getElementById("submit");
const copyBtn = document.getElementById("copy");

submitBtn.addEventListener("click", handleSubmit);
copyBtn.addEventListener("click", handleCopy);
