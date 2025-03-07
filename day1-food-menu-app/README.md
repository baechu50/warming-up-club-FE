## day1-food-menu-app

### 프로젝트 개요

> 음식 메뉴를 보여주는 앱

- 음식 타입을 선택하는 버튼이 상단에 있음
- 음식 타입 버튼을 클릭하면, 해당 버튼이 선택되고 해당 타입에 선택되는 음식메뉴가 화면에 출력
  - 음식 메뉴는 사진, 음식명, 가격, 설명으로 구성

![화면 기록 2025-03-05 오전 1 10 32](https://github.com/user-attachments/assets/d16e1939-bf40-42e0-a017-407b64e73068)

<br>

### 이벤트 위임 구현

- 모든 버튼에 이벤트 리스너를 달기보다는 버튼을 담고있는 부모 nav에 이벤트를 등록하여 구현했다.
- 부모에서 클릭 이벤트가 감지될때 이벤트 타겟이 버튼인 경우에 한해, selected 클래스를 추가해준다.
- 이후 메뉴가 프린트될 때는 selected 클래스를 가지고 있는 음식의 타입이 무엇인지 찾아내서 메뉴를 필터링한 뒤 화면에 보여준다.

```javascript
const nav = document.querySelector(".food-nav"); //버튼들의 부모

nav.addEventListener("click", handleClick);
nav.addEventListener("click", () => {
  printMenu(data);
});
```

```javascript
function handleClick(e, selectedType) {
  if (e.target.tagName !== "BUTTON") return; //버튼이 아니면 종료
  selectedType = e.target.dataset.type;

  document.querySelectorAll(".food-nav button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  e.target.classList.add("selected");
}
```
