## day6-password-generator

> 비밀번호 생성 앱

- 체크박스로 비밀번호 조건 설정
- 입력창에 비밀번호 길이 설정
- 비밀번호 생성 버튼 클릭시 설정한 조건에 맞는 비밀번호 출력
- copy 버튼으로 비밀번호 복사 가능

![화면 기록 2025-03-11 오전 12 15 36](https://github.com/user-attachments/assets/e9fa2d8e-0024-46f3-8721-1ebe2864da9c)

<br>

### 아스키코드 이용

- 각 문자에 해당하는 아스키코드 범위를 구함
  - a ~ z: 97 ~ 122
  - A ~ Z: 65 ~ 90
  - 0 ~ 9: 48 ~ 57
  - @ (64), ! (33), # (35), & (38), % (37)
- 조건에 맞는 아스키코드를 배열에 추가한 뒤, 랜덤으로 코드를 뽑아 비밀번호로 생성

- 설명

```javascript
//배열에서 아스키코드를 랜덤으로 뽑아 문자열로 변환
const getRandomChar = (rangeArr) => {
  return String.fromCharCode(
    rangeArr[Math.floor(Math.random() * rangeArr.length)]
  );
};
```
