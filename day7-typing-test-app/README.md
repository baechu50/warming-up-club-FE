## day7-typing-test-app

> 타자 연습 앱

- 제한시간이 주어짐
- 주어진 문장을 따라서 타이핑
- 틀린 글자는 빨강, 맞은 글자는 초록색으로 표기
- 실시간으로 정확도(accurancy), CPM, WPM 출력
- 제한 시간 종료시 재시작 버튼 등장

![화면 기록 2025-03-11 오후 10 21 02](https://github.com/user-attachments/assets/d849eb5f-87fc-4857-ad97-1ac349cdce41)

<br>

### class로 관련 데이터 묶기

- 점수 데이터를 ScoreBoard 클래스로 묶어서 관리
- 텍스트 데이터는 Text 클래스로 묶어서 관리

<br>

### 다음 문장으로 넘어가면 점수가 초기화 되는 이슈 해결

- ScoreBoard 클래스에 프로퍼티 추가
  - totalCount/totalError: 누적 입력/오류 문자열의 총합
  - count/count : 현재 문장 입력/오류 문자열의 총합
- 다음 문장으로 넘어갈 때 현재 문장의 값을 누적 값에 반영

```javascript
if (inputArr.length === textArr.length) {
  scoreBoard.totalError += scoreBoard.error; //반영
  scoreBoard.error = 0; //초기화

  scoreBoard.totalCount += scoreBoard.count;
  scoreBoard.count = 0;

  $text.innerText = text.getNextText();
  $input.value = "";
}
```

<br>

### 색상 반영하기

- 조건문을 통해 입력값과 보기 문장을 비교
  - 아직 도달하지 않은 문자열인 경우 : 그대로 두기
  - 맞게 입력한 문자열인 경우 : correct 클래스 적용
  - 틀리게 입력한 문자열인 경우 : wrong 클래스 적용

```javascript
const colorizedText = textArr.map((char, idx) => {
  if (!inputArr[idx]) return char; //도달하지 않음
  if (char === inputArr[idx]) return `<span class="correct">${char}</span>`; //맞음
  if (char !== inputArr[idx]) return `<span class="wrong">${char}</span>`; //틀림
});
```
