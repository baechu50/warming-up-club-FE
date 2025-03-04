async function getData() {
  const response = await fetch("./data.json");
  return response.json();
}

function createMenuItem(data) {
  const { id, name, type, price, description, image } = data;
  const item = document.createElement("div");
  item.classList.add("food-item");

  item.innerHTML = `
  <h3>${name} - ${price.toLocaleString("en-US")}₩</h3>
  <p>${description}</p>
  <img src="${image}"/>
  `;

  return item;
}

function filterMenu(data, selectedType) {
  if (selectedType === "all") return data;
  return data.filter((d) => d.type === selectedType);
}

function printMenu(data) {
  const selectedType = document.querySelector(".selected").dataset.type;
  const menus = filterMenu(data, selectedType).map(createMenuItem);
  const content = document.querySelector(".food-content");

  content.innerHTML = "";

  menus.forEach((m) => {
    content.appendChild(m);
  });
}

function handleClick(e, selectedType) {
  if (e.target.tagName !== "BUTTON") return;
  selectedType = e.target.dataset.type;

  document.querySelectorAll(".food-nav button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  e.target.classList.add("selected");
}

async function main() {
  const data = await getData();
  const nav = document.querySelector(".food-nav");

  printMenu(data);

  nav.addEventListener("click", handleClick);

  nav.addEventListener("click", () => {
    printMenu(data);
  });
}

main();
