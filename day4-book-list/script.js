const getLocalStorageData = () => {
  if (localStorage.length === 0) return {};

  return Object.fromEntries(
    Object.keys(localStorage).map((key) => [
      key,
      JSON.parse(localStorage.getItem(key)),
    ])
  );
};

const createItem = ({ id, name, author }) => {
  const newItem = document.createElement("div");
  newItem.classList.add("book-item");

  newItem.innerHTML = `
      <span>${name}</span>
      <span>${author}</span>
      <button class="delete-btn" id="${id}">X</button>`;

  return newItem;
};

const displayData = (data) => {
  const sortedData = Object.values(data).sort((d1, d2) => d1.id - d2.id);
  sortedData.forEach((d) => {
    bookList.appendChild(createItem(d));
  });
};

const addItem = (e) => {
  e.preventDefault();
  const inputName = document.getElementById("input-name");
  const inputAuthor = document.getElementById("input-author");

  const newBook = {
    id: Date.now(),
    name: inputName.value,
    author: inputAuthor.value,
  };

  bookList.appendChild(createItem(newBook));
  localStorage.setItem(newBook.id, JSON.stringify(newBook));

  inputName.value = "";
  inputAuthor.value = "";
};

const deleteItem = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  localStorage.removeItem(e.target.id);
  e.target.closest(".book-item").remove();
};

const submitBtn = document.querySelector("#submit");
const bookList = document.querySelector("content");

submitBtn.addEventListener("click", addItem);
bookList.addEventListener("click", deleteItem);

displayData(getLocalStorageData());
