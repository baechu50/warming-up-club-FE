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

<br>

## day2-rock-paper-scissors

> 가위바위보 게임 앱

- 총 10판을 진행
- 가위, 바위, 보 중 한가지 버튼을 선택
- 컴퓨터의 손과 비교해서 결과 출력 (비김, 이김, 짐)
- 10판이 끝나면 최종 결과 & 다시하기 버튼 출력

![화면 기록 2025-03-06 오후 1 03 49](https://github.com/user-attachments/assets/94b5be85-eb0d-45d8-9706-e0ccf70b7da7)

<br>

### 클로저 구현

- 점수 관련 변수들을 외부로부터 은닉하기 위해서 클로저 사용
- 플레이 결과를 입력하면 점수 객체를 리턴 (남은 횟수, 이긴 횟수, 진 횟수)
- 변수에 createScoreBoard()를 재할당하면 초기화된 점수 보드를 사용할 수 있음

```javascript
const createScoreBoard = () => {
  let totalCount = 0;
  let winCount = 0;
  let loseCount = 0;

  //함수를 리턴, 내부의 점수 관련 변수들을 참조
  return (result) => {
    if (MAX_PLAY <= totalCount) return { totalCount, winCount, loseCount };

    totalCount++;
    result === "win" && winCount++;
    result === "lose" && loseCount++;

    return { totalCount, winCount, loseCount };
  };
};

let scoreBoard = createScoreBoard(); //스코어 보드 생성
createScoreBoard("win"); // {totalCount:1, winCount:1, loseCount:0}
createScoreBoard("lose"); // {totalCount:2, winCount:1, loseCount:1}
scoreBoard = createScoreBoard(); //스코어 보드 초기화
```

<br>

## day3-quiz-app

> 수학 퀴즈 앱

- 퀴즈 문제와 선택지 버튼들이 주어짐
- 선택지 버튼을 클릭하면, 정답과 오답을 출력 (클릭 이벤트 막음)
- 다음 버튼 클릭시 다음 퀴즈 출력
- 모든 퀴즈를 풀었다면 restart버튼 출력

![화면 기록 2025-03-06 오후 3 43 35](https://github.com/user-attachments/assets/88336bc4-d206-4000-9b1d-3ad473b6f500)

<br>

### css 특징을 활용해 스타일 덮어씌우기

- 버튼이 유저 입력값과 동일하면 빨간색(오답) 클래스 부여
- 버튼이 정답과 동일하면 초록색(정답) 클래스 부여
- css 내에서 나중에 선언된 클래스가 먼저 선언된 클래스를 덮어씌움
- 해당 특성을 이용해 유저 입력과 정답이 동일한 경우(정답을 맞춘 경우) 오답 클래스를 먼저 적용하고 후에 정답 클래스를 적용해 구현

```javascript
[...choicesBox.children].forEach((child) => {
  if (child.textContent === userChoice) child.classList.add("wrong");
  if (child.textContent === answer) child.classList.add("correct");
  child.disabled = true;
});
```

<br>

## day4-book-list

> 책 기록 앱

- 입력란에 책 이름, 책 저자를 입력하고 제출 버튼을 누르면 리스트에 추가됨
- 리스트에서 삭제버튼을 누르면 해당 기록이 삭제됨
- 로컬스토리지에 책 데이터를 저장하여 새로고침해도 데이터가 유지됨

![화면 기록 2025-03-07 오전 4 08 17](https://github.com/user-attachments/assets/09101652-4dff-4a00-ba05-c72d55bbfc66)

<br>

### 로컬 스토리지 사용하기

- 각 책 데이터는 객체로 저장, id는 생성 시간으로 부여
- 데이터 추가 & 삭제시 로컬 스토리지에도 반영
- 데이터를 화면에 출력할때, id(생성시간)을 기준으로 sort하여 불러올때 리스트 순서가 바뀌는 문제 해결

```javascript
const newBook = {
  id: Date.now(), //데이터 생성 시간
  name: inputName.value,
  author: inputAuthor.value,
};

const displayData = (data) => {
  const sortedData = Object.values(data).sort((d1, d2) => d1.id - d2.id); //생성 시간을 기반으로 sort
  sortedData.forEach((d) => {
    bookList.appendChild(createItem(d));
  });
};
```
