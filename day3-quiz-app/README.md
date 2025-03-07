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
