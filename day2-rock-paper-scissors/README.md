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
